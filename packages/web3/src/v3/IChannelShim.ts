import {
    IChannel as LocalhostContract,
    IChannelBase as LocalhostIChannelBase,
    IChannelInterface as LocalhostInterface,
} from '@river-build/generated/dev/typings/IChannel'
import {
    IChannel as BaseSepoliaContract,
    IChannelInterface as BaseSepoliaInterface,
} from '@river-build/generated/v3/typings/IChannel'

import LocalhostAbi from '@river-build/generated/dev/abis/Channels.abi.json' assert { type: 'json' }
import BaseSepoliaAbi from '@river-build/generated/v3/abis/Channels.abi.json' assert { type: 'json' }

import { ethers } from 'ethers'
import { BaseContractShim } from './BaseContractShim'
import { ContractVersion } from '../IStaticContractsInfo'

export type { LocalhostIChannelBase as IChannelBase }

export class IChannelShim extends BaseContractShim<
    LocalhostContract,
    LocalhostInterface,
    BaseSepoliaContract,
    BaseSepoliaInterface
> {
    constructor(
        address: string,
        version: ContractVersion,
        provider: ethers.providers.Provider | undefined,
    ) {
        super(address, version, provider, {
            [ContractVersion.dev]: LocalhostAbi,
            [ContractVersion.v3]: BaseSepoliaAbi,
        })
    }
}