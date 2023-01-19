// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract GFXReserve is Initializable {
    using SafeERC20 for IERC20;

    IERC20 public gfx;

    address public rewarder;
    address public pool;

    /* ============ CONSTRUCTORS ========== */

    function initialize(address _gfx) external initializer {
        require(_gfx != address(0), "GfxReserve::constructor: invalid address");
        gfx = IERC20(_gfx);
    }

    /* ============ MUTATIVE ========== */

    function setRewarder(address _rewarder) external returns (bool) {
        require(rewarder == address(0), "GfxReserve::setRewarder: NOT_ALLOWED");
        rewarder = _rewarder;
        return true;
    }

    function setPool(address _pool) external returns (bool) {
        require(pool == address(0), "GfxReserve::setPool: NOT_ALLOWED");
        pool = _pool;
        return true;
    }

    function transfer(address _to, uint256 _amount) external {
        require(rewarder == msg.sender || pool == msg.sender, "GfxReserve::transfer: Only allowed funds can withdraw");
        require(_to != address(0), "GfxReserve::transfer: Invalid address");
        gfx.safeTransfer(_to, _amount);
    }
}
