require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './backend/artifacts',
    sources: './backend/contracts',
    cache: './backend/cache',
    tests: './backend/test',
  },
}
