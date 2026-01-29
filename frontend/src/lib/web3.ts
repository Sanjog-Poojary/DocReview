import { ethers } from "ethers";

declare global {
    interface Window {
        ethereum: any;
    }
}

// Robust retrieval of the Ethereum object (handles race conditions + EIP-6963)
const getEthereumObject = async () => {
    if (typeof window === "undefined") return null;

    // 1. Classic Injection (Immediate check)
    if (window.ethereum) return window.ethereum;

    // 2. EIP-6963 (Multi-Provider) Discovery
    let foundProvider: any = null;

    const onAnnounce = (event: any) => {
        const info = event.detail.info;
        const provider = event.detail.provider;
        console.log(`[Web3] Discovered EIP-6963 Wallet: ${info.name} (${info.rdns})`);
        if (!foundProvider && provider) {
            foundProvider = provider;
        }
    };

    window.addEventListener("eip6963:announceProvider", onAnnounce);

    // Dispatch request for providers to announce themselves
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    // 3. Poll for up to 3 seconds
    for (let i = 0; i < 6; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (window.ethereum) {
            window.removeEventListener("eip6963:announceProvider", onAnnounce);
            return window.ethereum;
        }

        if (foundProvider) {
            window.removeEventListener("eip6963:announceProvider", onAnnounce);
            return foundProvider;
        }
    }

    window.removeEventListener("eip6963:announceProvider", onAnnounce);
    return null;
};

export const connectWallet = async () => {
    try {
        const ethereum = await getEthereumObject();

        if (!ethereum) {
            // No wallet detected -> Return null so caller can handle fallback
            return null;
        }

        // Request access
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        console.log("Wallet connected successfully:", address);
        return { provider, signer, address };
    } catch (error) {
        console.error("Connection failed or rejected:", error);
        return null;
    }
};

// Default Hardhat local address
export const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const CONTRACT_ABI = [
    "function createProduct(string name, string manufacturer, string tokenURI) public returns (uint256)",
    "function transferProduct(address to, uint256 tokenId, string location) public",
    "function getProduct(uint256 tokenId) public view returns (string name, string manufacturer, uint256 manufactureDate, address currentOwner)",
    "function getProductHistory(uint256 tokenId) public view returns (tuple(address from, address to, uint256 timestamp, string location)[])",
    "event ProductCreated(uint256 indexed tokenId, string name, address indexed manufacturer)",
    "event ProductTransferred(uint256 indexed tokenId, address indexed from, address indexed to, string location)"
];

const getContract = async (signerOrProvider: any) => {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
};

export const createProduct = async (name: string, manufacturer: string) => {
    try {
        const wallet = await connectWallet();

        if (!wallet || !wallet.signer) {
            alert("Please connect your wallet to mint!");
            throw new Error("Wallet not connected");
        }

        const contract = await getContract(wallet.signer);
        const tx = await contract.createProduct(name, manufacturer, "ipfs://placeholder");
        const receipt = await tx.wait(); // Wait for confirmation

        // Parse logs to find Token ID
        let tokenId = "PENDING";

        for (const log of receipt.logs) {
            try {
                // In Ethers v6, we can parse logs using the interface
                const parsed = contract.interface.parseLog(log);
                if (parsed && parsed.name === "ProductCreated") {
                    tokenId = parsed.args[0].toString(); // args[0] is tokenId
                    break;
                }
            } catch (e) {
                continue;
            }
        }

        return { success: true, id: tokenId };
    } catch (error) {
        console.error("Blockchain call failed:", error);
        throw error;
    }
};

export const getProduct = async (id: string) => {
    try {
        let provider;
        const wallet = await connectWallet();

        if (wallet && wallet.provider) {
            provider = wallet.provider;
        } else {
            // Fallback to Read-Only Provider if wallet fails/rejected
            console.warn("Wallet not found or rejected, falling back to read-only local provider");
            provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        }

        const contract = await getContract(provider);
        const data = await contract.getProduct(id);

        // Convert BigInt to string/number
        return {
            id,
            name: data.name,
            manufacturer: data.manufacturer,
            manufactureDate: new Date(Number(data.manufactureDate) * 1000).toISOString().split('T')[0],
            owner: data.currentOwner
        };
    } catch (error) {
        console.warn(`Blockchain fetch failed for ID ${id}:`, error);
        return null;
    }
};

export const getProductHistory = async (id: string) => {
    try {
        let provider;
        const wallet = await connectWallet();

        if (wallet && wallet.provider) {
            provider = wallet.provider;
        } else {
            // Fallback to Read-Only Provider
            provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        }

        const contract = await getContract(provider);
        const history = await contract.getProductHistory(id);

        return history.map((h: any) => ({
            from: h.from,
            to: h.to,
            timestamp: new Date(Number(h.timestamp) * 1000).toISOString().split('T')[0],
            location: h.location
        }));
    } catch (error) {
        console.warn(`Blockchain history fetch failed for ID ${id}:`, error);
        return [];
    }
};
