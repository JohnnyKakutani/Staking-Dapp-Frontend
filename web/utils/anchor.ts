import * as anchor from "@project-serum/anchor"
import { AnchorProvider, Idl } from "@project-serum/anchor";
import { Connection, PublicKey, Transaction } from "@solana/web3.js"
import { AnchorWallet } from "@solana/wallet-adapter-react"
import { StakingDapp } from "./idl/staking_dapp"

export const getStakingDappProgram = (
    connection: Connection,
    wallet: AnchorWallet,
    idl: Idl,
    programId: PublicKey
) => {
    //instantiating program depends on the environment
    if (!idl) {
        console.log("IDL File Required");
    }
    if (!programId) {
        console.log("ProgramID Required");
    }

    const provider = new AnchorProvider(
        connection,
        wallet,
        AnchorProvider.defaultOptions()
    );
    anchor.setProvider(provider);

    const stakingDappProgram = new anchor.Program<StakingDapp>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        idl as any,
        programId,
        provider
    );

    return stakingDappProgram;
}

export const signAndSendTx = async (
    connection: Connection,
    tx: Transaction,
    wallet: AnchorWallet
) => {
    tx.recentBlockhash = (
        await connection.getLatestBlockhash("singleGossip")
    ).blockhash

    tx.feePayer = wallet.publicKey;
    const signedTx = await wallet.signTransaction(tx)
    const rawTransaction = signedTx.serialize()
    const txSig = await connection.sendRawTransaction(rawTransaction);

    const latestBlockHash = await connection.getLatestBlockhash()

    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txSig
    })

    return txSig
}