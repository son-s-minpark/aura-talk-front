import { create } from "zustand";

interface SignupType {
  mail: string;
  pw: string;
  name: string;
  id: string;
  description: string;
  interestList: string[];
}

interface SignupState {
  signupData: SignupType;
  updateSignupState: (newData: Partial<SignupType>) => void;
  consoleSignup: () => void;
}

const useSignupState = create<SignupState>((set, get) => ({
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
  consoleSignup: () => {
    console.error(get().signupData);
  },
}));

export default useSignupState;
