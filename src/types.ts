export type State = {
  voteinfo: {
    pollTitle: string;
    country: string;
    participantsNum: number;
    participantName: string;
    presaleRate: string;
    startTime: Date;
    endTime: Date;
    cliff: string;
    participantImages: string;
    tge: string;
    frequency: string;
    presaleToken: number;
    liquidityToken: number;
    liquidityPercent: string;
    vesting: boolean;
  };
};

export type Action = {
  updatePadInfo: (data: State["voteinfo"]) => void;
};
