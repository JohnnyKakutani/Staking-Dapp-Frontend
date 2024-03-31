export type StakingDapp = {
  "version": "0.1.0",
  "name": "staking_dapp",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "admin"
              }
            ]
          }
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "admin"
              }
            ]
          }
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userStakingWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminStakingWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "lockedays",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "admin"
              }
            ]
          }
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userStakingWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminStakingWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimReward",
      "accounts": [
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userStakingWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminStakingWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "userInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "depositSlot",
            "type": "u64"
          },
          {
            "name": "lockedDays",
            "type": "u64"
          },
          {
            "name": "reward",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "poolInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "token",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidSchedule",
      "msg": "Invalid vesting schedule given."
    },
    {
      "code": 6001,
      "name": "InvalidAssociatedTokenAddress",
      "msg": "Invalid associated token address. Did you provide the correct address?"
    },
    {
      "code": 6002,
      "name": "InvalidFund",
      "msg": "Insufficient fund"
    },
    {
      "code": 6003,
      "name": "InvalidUnlockTime",
      "msg": "Invalid unlock time"
    },
    {
      "code": 6004,
      "name": "InvalidUnlockAmount",
      "msg": "Invalid unlock amount"
    }
  ]
};

export const IDL: StakingDapp = {
  "version": "0.1.0",
  "name": "staking_dapp",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "admin"
              }
            ]
          }
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakingToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "admin"
              }
            ]
          }
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userStakingWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminStakingWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "lockedays",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "poolInfo",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "pool"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "admin"
              }
            ]
          }
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userStakingWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminStakingWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimReward",
      "accounts": [
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userStakingWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminStakingWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "userInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "depositSlot",
            "type": "u64"
          },
          {
            "name": "lockedDays",
            "type": "u64"
          },
          {
            "name": "reward",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "poolInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "token",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidSchedule",
      "msg": "Invalid vesting schedule given."
    },
    {
      "code": 6001,
      "name": "InvalidAssociatedTokenAddress",
      "msg": "Invalid associated token address. Did you provide the correct address?"
    },
    {
      "code": 6002,
      "name": "InvalidFund",
      "msg": "Insufficient fund"
    },
    {
      "code": 6003,
      "name": "InvalidUnlockTime",
      "msg": "Invalid unlock time"
    },
    {
      "code": 6004,
      "name": "InvalidUnlockAmount",
      "msg": "Invalid unlock amount"
    }
  ]
};
