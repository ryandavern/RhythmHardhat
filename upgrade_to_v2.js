const {ethers, upgrades} = require("hardhat");
require('dotenv').config();

const PROXY = process.env.PROXY; //contract address
const PROXY_ADMIN = process.env.PROXY_ADMIN;

async function main() {
	const Rhythm = await ethers.getContractFactory("Rhythm");
	
	// Get the default signer
    const signer = new ethers.Wallet(process.env.PRI_KEY, ethers.provider);

    console.log("Signer address: ", signer.address);

    // Estimate the gas required for the upgrade using a dry run
    const upgradeSimulation = await upgrades.upgradeProxy(PROXY, Rhythm, { dryRun: true });
	const gasEstimate = upgradeSimulation.deployTransaction.gasLimit;

  	console.log("Estimated Gas Base: " + gasEstimate);

  	// Add some buffer to the gas estimate (e.g., 20% more)
  	const gasLimit = Math.floor(gasEstimate.toNumber() * 1.2);

  	console.log("Estimated Gas: " + gasLimit);

  	// Perform the upgrade with the manual gas limit
  	const rhythmProxy = await upgrades.upgradeProxy(PROXY, Rhythm, { initializer: "initialize", gasLimit, signer });
	console.log("Upgrade successful");

	const implementationAddress = await upgrades.erc1967.getImplementationAddress(rhythmProxy.address);
	console.log("Rhythm implementation contract address: ", implementationAddress);
}

main();