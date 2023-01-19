import {network} from 'hardhat';
import {DeployFunction} from 'hardhat-deploy/dist/types';

const func: DeployFunction = async ({deployments, getNamedAccounts, wellknown}) => {
  const {deploy, get, execute} = deployments;
  const {deployer} = await getNamedAccounts();

  console.log('> deployer', deployer);
  console.log('> Network name:' + network.name);
  console.log('> wellknow:' + JSON.stringify(wellknown));
  console.log((wellknown as any)[network.name].addresses);

  const lp_gftm_eth = "0x8b74df2ffa35464cb6cb96888ff8eecae29f728f"  //{address: (wellknown as any)[network.name].addresses.xTokenEth};
  const lp_gfx_eth = "0x63B560616CcCc218ade162bB580579f55c3320bb" //{address: (wellknown as any)[network.name].addresses.yTokenEth};

  const pairGFXEth = await deploy('PairOracle_GFX_ETH', {
    contract: 'UniswapPairOracle',
    from: deployer,
    log: true,
    args: [lp_gfx_eth], // .address
  });

  const pairGFTMEth = await deploy('PairOracle_GFTM_ETH', {
    contract: 'UniswapPairOracle',
    from: deployer,
    log: true,
    args: [lp_gftm_eth], // .address
  });

  const gftm = await get('GFTM');
  const gfx = await get('GFX');

  await deploy('MasterOracle', {
    from: deployer,
    log: true,
    args: [gftm.address, gfx.address, pairGFTMEth.address, pairGFXEth.address],
  });
};

func.tags = ['oracles'];

func.skip = async ({network}) => {
  return network.name !== 'fantom';
};

export default func;
