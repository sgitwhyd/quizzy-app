import { create } from "zustand";

type State = {
	isTimerStart: boolean;
	isTimerFinish: boolean;
};

type Action = {
	setIsTimerStart: () => void;
	setIsTimerFinish: () => void;
};

const useGlobalStore = create<State & Action>((set) => ({
	isTimerStart: false,
	isTimerFinish: false,
	setIsTimerStart: () => set(() => ({ isTimerStart: true })),
	setIsTimerFinish: () => set(() => ({ isTimerFinish: true })),
}));

export default useGlobalStore;
