//require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");

// https://www.youtube.com/watch?v=JRXd2_0b0Zk

module.exports = {
	solidity: {
		compilers: [
		{
			version: "0.6.12",
			settings: {
	        	optimizer: {
	          		enabled: true,
	          		runs: 200
	        	}
	      	}
	    },
	    {
	    	version: "0.8.2",
	    	settings: {
	    		optimizer: {
	    			enabled: true,
	    			runs: 200
	    		}
	    	}
		}]
	},
	networks: {
		mainnet: {
			url: 'https://mainnet.infura.io/v3/' + process.env.INFURA_API_KEY,
			accounts: [process.env.PRI_KEY]
		},
		bsc: {
			url: 'https://bsc-dataseed.binance.org/',
			accounts: [process.env.PRI_KEY]
		}
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY, // IH8N8SXS7BS9AHZKNAMBNASHVPWG3AMAKJ bsc | 1B4PGMRZS4WI4BHXF6ASYNNKHFXPXMMQ7A eth
	},
}