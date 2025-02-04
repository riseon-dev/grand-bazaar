// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Copyright (c), 2019 Rob Hitchens

library AddressSet {
    struct Set {
        mapping(address => uint) keyPointers;
        address[] keyList;
    }

    function insert(Set storage self, address key) internal {
        require(key != address(0), "UnorderedKeySet(100) - Key cannot be 0x0");
        require(!contains(self, key), "UnorderedAddressSet(101) - Address (key) already exists in the set.");
        self.keyList.push(key);
        self.keyPointers[key] = self.keyList.length - 1;
    }

    function remove(Set storage self, address key) internal {
        require(contains(self, key), "UnorderedKeySet(102) - Address (key) does not exist in the set.");
        address keyToMove = self.keyList[size(self) - 1];
        uint rowToReplace = self.keyPointers[key];
        self.keyPointers[keyToMove] = rowToReplace;
        self.keyList[rowToReplace] = keyToMove;
        delete self.keyPointers[key];
        self.keyList.pop();
    }

    function size(Set storage self) internal view returns (uint) {
        return (self.keyList.length);
    }

    function contains(Set storage self, address key) internal view returns (bool) {
        if (self.keyList.length == 0) return false;
        return self.keyList[self.keyPointers[key]] == key;
    }

    function keyAtIndex(Set storage self, uint index) internal view returns (address) {
        return self.keyList[index];
    }

    function values(Set storage self) internal view returns (address[] memory) {
        return self.keyList;
    }
}
