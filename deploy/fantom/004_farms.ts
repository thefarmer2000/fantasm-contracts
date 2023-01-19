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

  const lp_gftm_eth = "0x8b74df2ffa35464cb6cb96888ff8eecae29f728f"  //{address: (wellknown as any)[network.name].addresses.xTokenEth};
  const lp_gfx_eth = "0x63B560616CcCc218ade162bB580579f55c3320bb" //{address: (wellknown as any)[network.name].addresses.yTokenEth};

  await deploy('WonderfulChef', {
    from: deployer,
    log: true,
  });

  await execute(
    'WonderfulChef',
    {from: deployer, log: true},
    'add',
    80000,
    lp_gfx_eth,
    constants.AddressZero
  );

  await execute(
    'WonderfulChef',
    {from: deployer, log: true},
    'add',
    20000,
    lp_gftm_eth,
    constants.AddressZero
  );
};

func.tags = ['farm'];

func.skip = async ({network}) => {
  return network.name !== 'fantom';
};

export default func;
