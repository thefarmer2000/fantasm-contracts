import {DeployFunction} from 'hardhat-deploy/dist/types';

//const Web3 = require("web3");

const func: DeployFunction = async ({deployments, getNamedAccounts}) => {
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  console.log(deployer);

  // await deploy('Timelock', {
  //   from: deployer,
  //   log: true,
  //   args: [deployer, 12 * 3600],
  // });

  // await deploy('Timelock_7day', {
  //   contract: 'Timelock',
  //   from: deployer,
  //   log: true,
  //   args: [deployer, 7 * 24 * 3600],
  // });

  await deploy('Multicall', {
    from: deployer,
    log: true,
    args: [],
  });

  await deploy ('WethUtils', {
    from: deployer,
    log: true,
    args: []
  });
};

func.tags = ['tools'];

// func.skip = async ({network}) => {
//   return network.name !== 'fantom';
// };

export default func;
