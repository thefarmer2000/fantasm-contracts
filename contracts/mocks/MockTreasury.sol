pragma solidity 0.8.4;

contract MockTreasury {
    uint256 public maxGftmSupply;
    uint256 private redeemFee;
    uint256 private mintingFee;
    uint256 private cr;

    function mock(
        uint256 _maxGftmSupply,
        uint256 _cr,
        uint256 _mintingFee,
        uint256 _redeemFee
    ) public {
        maxGftmSupply = _maxGftmSupply;
        redeemFee = _redeemFee;
        mintingFee = _mintingFee;
        cr = _cr;
    }

    function info()
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (cr, mintingFee, redeemFee);
    }
}
