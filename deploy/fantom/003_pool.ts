import {network} from 'hardhat';
import {DeployFunction} from 'hardhat-deploy/dist/types';

const func: DeployFunction = async ({deployments, getNamedAccounts, wellknown}) => {
  const {deploy, get, execute} = deployments;
  const {deployer} = await getNamedAccounts();

  console.log('> deployer', deployer);
  console.log('> Network name:' + network.name);
  console.log('> wellknow:' + JSON.stringify(wellknown));
  console.log((wellknown as any)[network.name].addresses);

  const reserve = await get('GFXReserve');
  const gftm = await get('GFTM');
  const gfx = await get('GFX');
  const wethUtils = await get('WethUtils');

  await deploy('Pool', {
    from: deployer,
    log: true,
    args: [gftm.address, gfx.address, reserve.address],
    libraries: {
      WethUtils: wethUtils.address,
    },
  });

  const oracle = await get('MasterOracle');
 // await execute('Pool', {from: deployer, log: true}, 'setOracle', oracle.address);
};

func.tags = ['pool'];

func.skip = async ({network}) => {
  return network.name !== 'fantom';
};

export default func;
