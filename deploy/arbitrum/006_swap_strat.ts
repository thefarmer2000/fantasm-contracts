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
  const lp_afx_eth = "0xa6bd5B143c2dEC9BDB7F1355AB0d6290B5B11608"; //{address: (wellknown as any)[network.name].addresses.yTokenEth};

  const afx = await get('AFX');
  const treasury = await get('WonderfulTreasury');
  const wethUtils = await get('WethUtils');

  const swapSlippage = 20000; // 2%
  const swapPaths = [weth.address, afx.address];
  const swapStrat = await deploy('SwapStrategyPOL', {
    from: deployer,
    log: true,
    args: [
      afx.address,
      lp_afx_eth,
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

// func.skip = async ({network}) => {
//   return network.name !== 'fantom';
// };

export default func;
