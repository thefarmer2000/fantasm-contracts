import { BigNumber } from 'ethers';
import {DeployFunction} from 'hardhat-deploy/dist/types';

const func: DeployFunction = async ({deployments, getNamedAccounts}) => {
  const {deploy, execute} = deployments;
  const {deployer} = await getNamedAccounts();
  console.log("Deployer: " + deployer)

  await deploy('GFTM', {
    contract: 'GFTM',
    from: deployer,
    log: true,
    args: ['Wonderly GFTM Token', 'GFTM'],
  });

  const reserve = await deploy('GFXReserve', {
    from: deployer,
    log: true,
    args: [],
  });

  const treasuryFund = await deploy('GFXTreasuryFund', {
    from: deployer,
    log: true,
    args: [],
  });

  const daoFund = await deploy('GFXDaoFund', {
    from: deployer,
    log: true,
    args: [],
  });

  const devFund = await deploy('GFXDevFund', {
    from: deployer,
    log: true,
    args: [],
  });

  const gfx = await deploy('GFX', {
    contract: 'GFX',
    from: deployer,
    log: true,
    args: [
      'Wonderly GFX Token',
      'GFX',
      daoFund.address,
      devFund.address,
      treasuryFund.address,
      reserve.address
    ],
  });

  // await execute('GFXReserve', {from: deployer, log: true }, 'initialize', gfx.address);
  // await execute('GFXDaoFund', {from: deployer, log: true }, 'initialize', gfx.address);
  // await execute('GFXTreasuryFund', {from: deployer, log: true }, 'initialize', gfx.address);
  // await execute('GFXDevFund', {from: deployer, log: true}, 'initialize', gfx.address);
};

func.tags = ['tokens'];

func.skip = async ({network}) => {
  return network.name !== 'fantom';
};

export default func;
