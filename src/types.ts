export type State = {
  voteinfo: {
    pollTitle: string;
    country: string;
    participantsNum: number;
    candidates: Array<{ name: string }>;
    startTime: Date;
    endTime: Date;
    votes: [];
  };
};

export type Action = {
  updatePadInfo: (data: State["voteinfo"]) => void;
};
