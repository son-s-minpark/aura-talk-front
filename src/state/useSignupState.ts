import { create } from "zustand";

type SignupType = {
  mail: string;
  pw: string;
  nickname: string;
  username: string;
  description: string;
  interestList: string[];
};

type SignupState = {
  signupData: SignupType;
  updateSignupState: (newData: Partial<SignupType>) => void;
  addInterest: (interest: string) => void;
  removeInterest: (label: string) => void;
};

const useSignupState = create<SignupState>((set) => ({
  signupData: {
    mail: "",
    pw: "",
    nickname: "",
    username: "",
    description: "",
    interestList: [],
  },
  updateSignupState: (newData) =>
    set((state) => ({ signupData: { ...state.signupData, ...newData } })),
  addInterest: (interest) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        interestList: [...state.signupData.interestList, interest],
      },
    })),
  removeInterest: (label) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        interestList: state.signupData.interestList.filter((i) => i !== label),
      },
    })),
}));

export default useSignupState;
