import { BigNumber } from 'ethers';
import {DeployFunction} from 'hardhat-deploy/dist/types';

const func: DeployFunction = async ({deployments, getNamedAccounts}) => {
  const {deploy, execute} = deployments;
  const {deployer} = await getNamedAccounts();
  console.log("Deployer: " + deployer)

  await deploy('XETH', {
    contract: 'XETH',
    from: deployer,
    log: true,
    args: ['Wonderful Protocol XETH Token', 'XETH'],
  });

  const reserve = await deploy('AFXReserve', {
    from: deployer,
    log: true,
    args: [],
  });

  const treasuryFund = await deploy('AFXTreasuryFund', {
    from: deployer,
    log: true,
    args: [],
  });

  const daoFund = await deploy('AFXDaoFund', {
    from: deployer,
    log: true,
    args: [],
  });

  const devFund = await deploy('AFXDevFund', {
    from: deployer,
    log: true,
    args: [],
  });

  const afx = await deploy('AFX', {
    contract: 'AFX',
    from: deployer,
    log: true,
    args: [
      'Wonderful Protocol AFX Token',
      'AFX',
      daoFund.address,
      devFund.address,
      treasuryFund.address,
      reserve.address
    ],
  });

  // await execute('AFXReserve', {from: deployer, log: true }, 'initialize', afx.address);
  // await execute('AFXDaoFund', {from: deployer, log: true }, 'initialize', afx.address);
  // await execute('AFXTreasuryFund', {from: deployer, log: true }, 'initialize', afx.address);
  // await execute('AFXDevFund', {from: deployer, log: true}, 'initialize', afx.address);
};

func.tags = ['tokens'];

// func.skip = async ({network}) => {
//   return network.name !== 'fantom';
// };

export default func;
