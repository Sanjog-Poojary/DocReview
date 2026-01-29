# Supply Chain & Provenance dApp

A decentralized application for tracking luxury goods and pharmaceuticals using NFTs for provenance.

## Structure
- `/frontend`: Next.js App Router + TailwindCSS
- `/contracts`: Hardhat + Solidity Smart Contracts

## Getting Started

### Prerequisites
- Node.js
- MetaMask wallet

### Run Locally

1. Install dependencies
```bash
cd frontend && npm install
cd ../contracts && npm install
```

2. Start Frontend
```bash
cd frontend
npm run dev
```

3. Test Contracts
```bash
cd contracts
npx hardhat test
```
