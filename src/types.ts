export type State = {
  voteinfo: {
    pollTitle: string;
    country: string;
    participantsNum: number;
    candidates: Array<string>;
    participantName: string;
    votes: Array<number>;
    startTime: Date;
    endTime: Date;
    participantImages: string;
  };
};

export type Action = {
  updatePadInfo: (data: State["voteinfo"]) => void;
};
