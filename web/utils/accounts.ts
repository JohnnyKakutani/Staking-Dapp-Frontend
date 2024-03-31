/* eslint-disable @typescript-eslint/no-unused-vars */
import * as anchor from "@project-serum/anchor"
import { Metadata, Metaplex, PublicKey } from "@metaplex-foundation/js"
import { getAssociatedTokenAddress } from "@solana/spl-token"
import { StakingDapp } from "./idl/staking_dapp"
import { Connection } from "@solana/web3.js"

export const getUserInfo = async (
    program: anchor.Program<StakingDapp>,
    userPubkey: PublicKey
) => {
    const [userInfo, _userInfoBump] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), userPubkey.toBuffer()],
        program.programId
    )
    try {
        const userInfoData = await program.account.userInfo.fetch(userInfo)
        return userInfoData
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getPoolInfo = async (
    program: anchor.Program<StakingDapp>,
    adminPubKey: PublicKey,
) => {
    const [poolInfo, _poolInfoBump] = PublicKey.findProgramAddressSync(
        [Buffer.from('pool'), adminPubKey.toBuffer()],
        program.programId
    )
    try {
        const poolInfoData = program.account.poolInfo.fetch(poolInfo)
        return poolInfoData
    } catch (error) {
        console.log(error)
        return null
    }
}
