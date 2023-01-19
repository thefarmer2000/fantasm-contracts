export const wellknown = {
  fantom: {
    addresses: {
      weth: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // wftm
      xTokenEth: '0x8b74df2ffa35464cb6cb96888ff8eecae29f728f', // gftm/wftm
      yTokenEth: '0x63B560616CcCc218ade162bB580579f55c3320bb', // gfx/wftm
      swapRouter: '0xF491e7B69E4244ad4002BC14e878a34207E38c29', // spooky
    },
  },
};

export type Wellknown = typeof wellknown;
