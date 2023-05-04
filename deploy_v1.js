const { ethers, upgrades } = require("hardhat");

async function main() {
	const Rhythm = await ethers.getContractFactory("Rhythm");
	//const RhythmProxyAdmin = await ethers.getContractFactory("RhythmProxyAdmin");
	//const customProxyAdmin = await RhythmProxyAdmin.deploy();

	const rhythmProxy = await upgrades.deployProxy(Rhythm, [], { initializer: "initialize" });

	//console.log(`RhythmProxyAdmin deployed to: ${customProxyAdmin.address}`);
	console.log("Rhythm deployed to: ", rhythmProxy.address);

	const deployedOwner = await rhythmProxy.owner();
	console.log("Contract owner is: ", deployedOwner);

	const currentImplAddress = await upgrades.erc1967.getImplementationAddress(rhythmProxy.address);

	const check = await upgrades.admin.getInstance();
	console.log("OWNER: " + (await check.owner()));
}

main();