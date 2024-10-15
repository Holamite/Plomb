import { create } from "zustand";
import { State, Action } from "./types";

const useStore = create((set) => ({
  voteinfo: {
    pollTitle: "",
    country: "",
    participantsNum: 0,
    participantImages: "",
    participantName: "",
    startTime: new Date(),
    endTime: new Date(),
    cliff: "",
    tge: "",
    vestingDuration: "",
    frequency: "",
    presaleToken: 0,
    liquidityToken: 0,
    liquidityPercent: "",
    vesting: false,
  },

  updateVoteInfo: (data: any) => set({ voteinfo: data }),
}));

export default useStore;
