export const abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_zkmeVerifyContract",
        type: "address",
        internalType: "address",
      },
      {
        name: "_cooperator",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "checkVoterVerification",
    inputs: [
      {
        name: "voter",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "cooperator",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createElection",
    inputs: [
      {
        name: "pollTitle",
        type: "string",
        internalType: "string",
      },
      {
        name: "country",
        type: "string",
        internalType: "string",
      },
      {
        name: "_startMinutesFromNow",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_durationMinutes",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "candidateData",
        type: "tuple[]",
        internalType: "struct Voting.Candidate[]",
        components: [
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "ipfsHash",
            type: "string",
            internalType: "string",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "delegateVote",
    inputs: [
      {
        name: "electionId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "candidateName",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "delegates",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "electionCount",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "elections",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "pollTitle",
        type: "string",
        internalType: "string",
      },
      {
        name: "country",
        type: "string",
        internalType: "string",
      },
      {
        name: "startTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "endTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "exists",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCandidateIPFSHash",
    inputs: [
      {
        name: "electionId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "candidateName",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCandidateVotes",
    inputs: [
      {
        name: "electionId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "candidateName",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getElection",
    inputs: [
      {
        name: "electionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "pollTitle",
        type: "string",
        internalType: "string",
      },
      {
        name: "country",
        type: "string",
        internalType: "string",
      },
      {
        name: "startTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "endTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "candidates",
        type: "tuple[]",
        internalType: "struct Voting.Candidate[]",
        components: [
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "ipfsHash",
            type: "string",
            internalType: "string",
          },
        ],
      },
      {
        name: "votes",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getElectionsForCountry",
    inputs: [
      {
        name: "country",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getVoteStatus",
    inputs: [
      {
        name: "electionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "hasVoted",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "candidateName",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getWinner",
    inputs: [
      {
        name: "electionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "winner",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasVotedInElection",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerVoter",
    inputs: [
      {
        name: "country",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "registeredVotersByCountry",
    inputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "vote",
    inputs: [
      {
        name: "electionId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "candidateName",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "voters",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "voterAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "country",
        type: "string",
        internalType: "string",
      },
      {
        name: "registered",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "hasVoted",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "zkmeVerifyContract",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ZKMEVerifyUpgradeable",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "Delegated",
    inputs: [
      {
        name: "electionId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "delegator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "delegatee",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ElectionCreated",
    inputs: [
      {
        name: "electionId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "pollTitle",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "country",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "startTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "endTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "candidates",
        type: "tuple[]",
        indexed: false,
        internalType: "struct Voting.Candidate[]",
        components: [
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "ipfsHash",
            type: "string",
            internalType: "string",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ElectionResult",
    inputs: [
      {
        name: "electionId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "winner",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "voteCount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Voted",
    inputs: [
      {
        name: "electionId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "candidate",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "VoterRegistered",
    inputs: [
      {
        name: "voterAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "country",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
];
