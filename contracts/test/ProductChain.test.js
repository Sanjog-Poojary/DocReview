const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProductChain", function () {
    async function deployProductChainFixture() {
        const [owner, manufacturer, consumer] = await ethers.getSigners();
        const ProductChain = await ethers.getContractFactory("ProductChain");
        const productChain = await ProductChain.deploy();
        return { productChain, owner, manufacturer, consumer };
    }

    describe("Deployment", function () {
        it("Should deploy successfully", async function () {
            const { productChain } = await loadFixture(deployProductChainFixture);
            expect(productChain.target).to.not.be.undefined;
        });
    });

    describe("Product Lifecycle", function () {
        it("Should allow creating a product", async function () {
            const { productChain, owner } = await loadFixture(deployProductChainFixture);

            const tx = await productChain.createProduct("Luxury Watch", "Rolex", "ipfs://metadata");
            await tx.wait();

            const product = await productChain.getProduct(0);
            expect(product.name).to.equal("Luxury Watch");
            expect(product.manufacturer).to.equal("Rolex");
            expect(product.currentOwner).to.equal(owner.address);
        });

        it("Should track ownership transfer", async function () {
            const { productChain, owner, consumer } = await loadFixture(deployProductChainFixture);

            await productChain.createProduct("Luxury Bag", "Gucci", "ipfs://metadata-bag");

            await productChain.transferProduct(consumer.address, 0, "New York Store");

            const product = await productChain.getProduct(0);
            expect(product.currentOwner).to.equal(consumer.address);

            const history = await productChain.getProductHistory(0);
            expect(history.length).to.equal(2); // Creation + Transfer
            expect(history[1].location).to.equal("New York Store");
        });
    });
});
