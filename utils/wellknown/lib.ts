export const wellknown = {
  arbitrum: {
    addresses: {
      weth: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', // weth
      xTokenEth: '0x0e4a0caEb84A9c2904704d02738d40a82BE3c8Cb', // xeth/weth lp
      yTokenEth: '0xa6bd5B143c2dEC9BDB7F1355AB0d6290B5B11608', // afx/weth lp
      swapRouter: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506', // router
    },
  },
};

export type Wellknown = typeof wellknown;
