const hre = require("hardhat");

async function main() {
    const ProductChain = await hre.ethers.getContractFactory("ProductChain");
    const productChain = await ProductChain.deploy();

    await productChain.waitForDeployment();

    console.log(`ProductChain deployed to ${productChain.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
