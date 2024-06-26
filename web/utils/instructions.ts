import * as anchor from "@project-serum/anchor"
import { Keypair, PublicKey } from "@solana/web3.js"
import { StakingDapp } from "./idl/staking_dapp"
import bs58 from 'bs58'
import { BN } from 'bn.js'

const admin = Keypair.fromSecretKey(bs58.decode('baRCZUMsLSMWVg6VSimogVYK9tKH7JhBQqsUA9U5QJAWbxzoTzw2sQ87QePjw4WfvNxGEF4PkYWtgMdp8zqggwU'))

export const createInitializeIx = async (
    program: anchor.Program<StakingDapp>,
    stakingToken: PublicKey
) => {
    const ix = await program.methods
                .initialize()
                .accounts({
                    admin: admin.publicKey,
                })
                .instruction()
    return ix;
}

export const createStakeIx = async (
    program: anchor.Program<StakingDapp>,
    user: PublicKey,
    userTokenAddress: PublicKey,
    adminTokenAddress: PublicKey,
    stakingToken: PublicKey,
    amount: number,
    lockedDays: number
) => {
    const ix = program.methods
                .stake(new BN(amount * 100000000), new BN(lockedDays))
                .accounts({
                    user: user,
                    admin: admin.publicKey,
                    userStakingWallet: userTokenAddress,
                    adminStakingWallet: adminTokenAddress,
                    stakingToken: stakingToken,
                })
                .instruction()
    return ix;  
}

export const createClaimRewardIx = async (
    program: anchor.Program<StakingDapp>,
    user: PublicKey,
    userTokenAddress: PublicKey,
    adminTokenAddress: PublicKey,
    stakingToken: PublicKey
) => {
    const ix = program.methods
                .claimReward()
                .accounts({
                    user: user,
                    admin: admin.publicKey,
                    userStakingWallet: userTokenAddress,
                    adminStakingWallet: adminTokenAddress,
                    stakingToken: stakingToken,
                })
                .signers([admin])
                .instruction()
    return ix;
}

export const createUnstakingIx = async (
    program: anchor.Program<StakingDapp>,
    user: PublicKey,
    userTokenAddress: PublicKey,
    adminTokenAddress: PublicKey,
    stakingToken: PublicKey
) => {
    const ix = program.methods
                .claimReward()
                .accounts({
                    user: user,
                    admin: admin.publicKey,
                    userStakingWallet: userTokenAddress,
                    adminStakingWallet: adminTokenAddress,
                    stakingToken: stakingToken,
                })
                .signers([admin])
                .instruction()
    return ix;
}
