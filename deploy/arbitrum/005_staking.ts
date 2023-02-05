import {constants} from 'ethers';
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

  const farm = await get('WonderfulChef');
  const afx = await get('AFX');
  const reserve = await get('AFXReserve');
  const wethUtils = await get('WethUtils');

  const staking = await deploy('WonderfulStaking', {
    from: deployer,
    log: true,
    args: [afx.address, reserve.address, [farm.address]],
    libraries: {
      WethUtils: wethUtils.address,
    },
  });

  await execute('WonderfulChef', {from: deployer, log: true}, 'setRewardMinter', staking.address);

  const treasury = await deploy('WonderfulTreasury', {
    from: deployer,
    log: true,
    args: [staking.address],
  });

  await execute(
    'WonderfulStaking',
    {from: deployer, log: true},
    'addReward',
    weth.address,
    treasury.address
  );
};

func.tags = ['staking'];

// func.skip = async ({network}) => {
//   return network.name !== 'fantom';
// };

export default func;
