import {network} from 'hardhat';
import {DeployFunction} from 'hardhat-deploy/dist/types';

const func: DeployFunction = async ({deployments, getNamedAccounts, wellknown}) => {
  const {deploy, get, execute} = deployments;
  const {deployer} = await getNamedAccounts();

  console.log('> deployer', deployer);
  console.log('> Network name:' + network.name);
  console.log('> wellknow:' + JSON.stringify(wellknown));
  console.log((wellknown as any)[network.name].addresses);

  const weth = {address: (wellknown as any)[network.name].addresses.weth};
  const swapRouter = {address: (wellknown as any)[network.name].addresses.swapRouter};
  const lp_gfx_eth = "0x63B560616CcCc218ade162bB580579f55c3320bb"; //{address: (wellknown as any)[network.name].addresses.yTokenEth};

  const gfx = await get('GFX');
  const treasury = await get('WonderfulTreasury');
  const wethUtils = await get('WethUtils');

  const swapSlippage = 20000; // 2%
  const swapPaths = [weth.address, gfx.address];
  const swapStrat = await deploy('SwapStrategyPOL', {
    from: deployer,
    log: true,
    args: [
      gfx.address,
      lp_gfx_eth,
      treasury.address,
      swapRouter.address,
      swapPaths,
    ],
    libraries: {
      WethUtils: wethUtils.address,
    },
  });

  await execute('Pool', {from: deployer, log: true}, 'setSwapStrategy', swapStrat.address);
  await execute('Pool', {from: deployer, log: true}, 'setTreasury', treasury.address);
};

func.tags = ['swap_strat'];

func.skip = async ({network}) => {
  return network.name !== 'fantom';
};

export default func;
