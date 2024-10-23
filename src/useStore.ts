import { create } from "zustand";
import { State, Action } from "./types";

const useStore = create((set) => ({
  voteinfo: {
    pollTitle: "",
    country: "",
    participantsNum: 0,
    candidates: [],
    startTime: new Date(),
    endTime: new Date(),
  },

  updateVoteInfo: (data: any) => set({ voteinfo: data }),
}));

export default useStore;
