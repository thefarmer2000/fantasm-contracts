import 'dotenv/config';
import {DeployFunction} from 'hardhat-deploy/types';
export function node_url(networkName: string): string {
  if (networkName) {
    const uri = process.env['ETH_NODE_URI_' + networkName.toUpperCase()];
    if (uri && uri !== '') {
      return uri;
    }
  }

  let uri = process.env.ETH_NODE_URI;
  if (uri) {
    uri = uri.replace('{{networkName}}', networkName);
  }
  if (!uri || uri === '') {
    // throw new Error(`environment variable "ETH_NODE_URI" not configured `);
    return '';
  }
  if (uri.indexOf('{{') >= 0) {
    throw new Error(`invalid uri or network not supported by nod eprovider : ${uri}`);
  }
  return uri;
}

export function getMnemonic(networkName?: string): string {
  if (networkName) {
    const mnemonic = process.env['MNEMONIC_' + networkName.toUpperCase()];
    if (mnemonic && mnemonic !== '') {
      return mnemonic;
    }
  }

  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic || mnemonic === '') {
    return 'test test test test test test test test test test test junk';
  }
  return mnemonic;
}

export function accounts(networkName?: string): {mnemonic: string} {
  return {mnemonic: getMnemonic(networkName)};
}

export const etherscanApiKey = (): string => {
  return process.env['ETHERSCAN_API_KEY'] || 'H1YMWUAYRVVTPTW72I48WESHEGP4ZYQ3T3';
};

export const skipTags = (func: DeployFunction): void => {
  func.skip = async (hre) => {
    return !func.tags?.includes(hre.network.name);
  };
};
