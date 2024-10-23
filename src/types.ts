export type State = {
  voteinfo: {
    pollTitle: string;
    country: string;
    participantsNum: number;
    candidates: Array<{ name: string }>;
    participantName: string;
    startTime: Date;
    endTime: Date;
    participantImages: string;
  };
};

export type Action = {
  updatePadInfo: (data: State["voteinfo"]) => void;
};
