// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract AFXReserve is Initializable {
    using SafeERC20 for IERC20;

    IERC20 public afx;

    address public rewarder;
    address public pool;

    /* ============ CONSTRUCTORS ========== */

    function initialize(address _afx) external initializer {
        require(_afx != address(0), "AfxReserve::constructor: invalid address");
        afx = IERC20(_afx);
    }

    /* ============ MUTATIVE ========== */

    function setRewarder(address _rewarder) external returns (bool) {
        require(rewarder == address(0), "AfxReserve::setRewarder: NOT_ALLOWED");
        rewarder = _rewarder;
        return true;
    }

    function setPool(address _pool) external returns (bool) {
        require(pool == address(0), "AfxReserve::setPool: NOT_ALLOWED");
        pool = _pool;
        return true;
    }

    function transfer(address _to, uint256 _amount) external {
        require(rewarder == msg.sender || pool == msg.sender, "AfxReserve::transfer: Only allowed funds can withdraw");
        require(_to != address(0), "AfxReserve::transfer: Invalid address");
        afx.safeTransfer(_to, _amount);
    }
}
