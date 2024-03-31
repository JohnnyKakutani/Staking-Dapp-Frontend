'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { AppHero } from '../ui/ui-layout';
import { Keypair, PublicKey, Transaction } from "@solana/web3.js"
import bs58 from 'bs58'
import { useEffect, useMemo, useState } from 'react';
import { IdlAccounts, Program, ProgramAccount } from "@project-serum/anchor"
import { createClaimRewardIx, createStakeIx } from '@/utils/instructions';
import { getAssociatedTokenAddress } from "@solana/spl-token"
import { StakingDapp, IDL } from "@/utils/idl/staking_dapp"
import { getStakingDappProgram, signAndSendTx } from '@/utils/anchor';
import { getPoolInfo, getUserInfo } from '@/utils/accounts';
const links: { label: string; href: string }[] = [
  { label: 'Solana Docs', href: 'https://docs.solana.com/' },
  { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
  { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
  { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
  {
    label: 'Solana Developers GitHub',
    href: 'https://github.com/solana-developers/',
  },
];

const admin = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_ADMIN_PRIVATE_KEY ?? ""))
type PoolInfoStruct = IdlAccounts<StakingDapp>["poolInfo"]
type UserInfoStruct = IdlAccounts<StakingDapp>["userInfo"]
export default function DashboardFeature() {
  const stakingToken = new PublicKey(process.env.NEXT_PUBLIC_COLLECTION_MINT ?? "");
  const [stakingProgram, setStakingProgram] = useState<Program<StakingDapp> | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfoStruct | null>(null)
  const [poolInfo, setPoolInfo] = useState<PoolInfoStruct | null>(null)
  const { connection } = useConnection()
  const wallet = useAnchorWallet()
  const [userTokenAddress, setUserTokenAddress] = useState<PublicKey>(new PublicKey(""))
  const [adminTokenAddress, setAdminToeknAddress] = useState<PublicKey>(new PublicKey(""))

  useEffect(() => {
    if (wallet) {
      ;(async () => {
        const program = getStakingDappProgram(connection, wallet, IDL, new PublicKey(process.env.NEXT_PROGRAM_ID ?? ""))
        setStakingProgram(program)
        const userInfo = await getUserInfo(program, wallet.publicKey);
        setUserInfo(userInfo)
        const poolInfo = await getPoolInfo(program, admin.publicKey);
        setPoolInfo(poolInfo)
      })()
    }
  },[wallet])
  useMemo(async () => {
    if (wallet) {
      const userAddress = await getAssociatedTokenAddress(stakingToken, wallet.publicKey)
      const adminAddress = await getAssociatedTokenAddress(stakingToken, admin.publicKey)
      setUserTokenAddress(userAddress)
      setAdminToeknAddress(adminAddress)
    }
  }, [wallet])

  const handleStake = async () => {
    if (wallet && stakingProgram && stakingToken) {
      const stakeIx = await createStakeIx(
        stakingProgram, wallet.publicKey, userTokenAddress, adminTokenAddress, stakingToken, 100, 15
      )
      const tx = new Transaction()
      tx.add(stakeIx)
      const txSig = await signAndSendTx(connection, tx, wallet)
      console.log(`https://solscan.io/tx/${txSig}?cluster=devnet`)
      const userInfo = await getUserInfo(stakingProgram, wallet.publicKey);
      setUserInfo(userInfo)
      const poolInfo = await getPoolInfo(stakingProgram, admin.publicKey);
      setPoolInfo(poolInfo)
    }
  }

  const handleClaimReward = async () => {
    if (wallet && stakingProgram && stakingToken) {
      const stakeIx = await createClaimRewardIx(
        stakingProgram, wallet.publicKey, userTokenAddress, adminTokenAddress, stakingToken
      )
      const tx = new Transaction()
      tx.add(stakeIx)
      const txSig = await signAndSendTx(connection, tx, wallet)
      console.log(`https://solscan.io/tx/${txSig}?cluster=devnet`)
      const userInfo = await getUserInfo(stakingProgram, wallet.publicKey);
      setUserInfo(userInfo)
      const poolInfo = await getPoolInfo(stakingProgram, admin.publicKey);
      setPoolInfo(poolInfo)
    }
  }

  const handleUnstaking = async () => {
    if (wallet && stakingProgram && stakingToken) {
      const stakeIx = await createClaimRewardIx(
        stakingProgram, wallet.publicKey, userTokenAddress, adminTokenAddress, stakingToken
      )
      const tx = new Transaction()
      tx.add(stakeIx)
      const txSig = await signAndSendTx(connection, tx, wallet)
      console.log(`https://solscan.io/tx/${txSig}?cluster=devnet`)
      const userInfo = await getUserInfo(stakingProgram, wallet.publicKey);
      setUserInfo(userInfo)
      const poolInfo = await getPoolInfo(stakingProgram, admin.publicKey);
      setPoolInfo(poolInfo)
    }
  }
  return (
    <div>
      <AppHero title="gm" subtitle="Say hi to your new Solana dApp." />
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="space-y-2">
          <p>Here are some helpful links to get you started.</p>
          {links.map((link, index) => (
            <div key={index}>
              <a
                href={link.href}
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
