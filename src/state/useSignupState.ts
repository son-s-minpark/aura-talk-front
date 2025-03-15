import { create } from "zustand";

type SignupType = {
  mail: string;
  pw: string;
  name: string;
  id: string;
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
    name: "",
    id: "",
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
