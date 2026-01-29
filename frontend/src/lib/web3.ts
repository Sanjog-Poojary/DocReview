import { ethers } from "ethers";

declare global {
    interface Window {
        ethereum: any;
    }
}

export const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            return { provider, signer, address };
        } catch (error) {
            console.error("User rejected request", error);
            return null;
        }
    } else {
        alert("Please install MetaMask!");
        return null;
    }
};

export const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
export const CONTRACT_ABI = [
    "function createProduct(string name, string manufacturer, string tokenURI) public returns (uint256)",
    "function transferProduct(address to, uint256 tokenId, string location) public",
    "function getProduct(uint256 tokenId) public view returns (string name, string manufacturer, uint256 manufactureDate, address currentOwner)",
    "function getProductHistory(uint256 tokenId) public view returns (tuple(address from, address to, uint256 timestamp, string location)[])"
];
