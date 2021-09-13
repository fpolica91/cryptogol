require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/5bbf664e3ee04d9f9ea5beb00a667196",
      // accounts from which we are deploying our contracts
      // for testnet no need to add accounts
      accounts: [privateKey],
    },
    mainnet: {
      url: "https://polygon-mainnet.infura.io/v3/5bbf664e3ee04d9f9ea5beb00a667196",
      accounts: [privateKey],
    },
  },
  solidity: "0.8.4",
};
