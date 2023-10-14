// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@thirdweb-dev/contracts/prebuilts/account/non-upgradeable/AccountFactory.sol";

contract POIAccountFactory is AccountFactory {
      constructor(
        IEntryPoint _entrypoint
    )
        AccountFactory(
            _entrypoint
        )
    {}
}