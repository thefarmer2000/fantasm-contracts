import {constants} from 'ethers';
import {network} from 'hardhat';
import {DeployFunction} from 'hardhat-deploy/dist/types';

const func: DeployFunction = async ({deployments, getNamedAccounts, wellknown}) => {
  const {deploy, execute} = deployments;
  const {deployer} = await getNamedAccounts();

  console.log('> deployer', deployer);
  console.log('> Network name:' + network.name);
  console.log('> wellknow:' + JSON.stringify(wellknown));
  console.log((wellknown as any)[network.name].addresses);

  const lp_xeth_eth = "0x0e4a0caEb84A9c2904704d02738d40a82BE3c8Cb"  //{address: (wellknown as any)[network.name].addresses.xTokenEth};
  const lp_afx_eth = "0xa6bd5B143c2dEC9BDB7F1355AB0d6290B5B11608" //{address: (wellknown as any)[network.name].addresses.yTokenEth};

  await deploy('WonderfulChef', {
    from: deployer,
    log: true,
  });

  await execute(
    'WonderfulChef',
    {from: deployer, log: true},
    'add',
    80000,
    lp_afx_eth,
    constants.AddressZero
  );

  await execute(
    'WonderfulChef',
    {from: deployer, log: true},
    'add',
    20000,
    lp_xeth_eth,
    constants.AddressZero
  );
};

func.tags = ['farm'];

// func.skip = async ({network}) => {
//   return network.name !== 'fantom';
// };

export default func;
