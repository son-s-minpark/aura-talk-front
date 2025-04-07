import { create } from "zustand";
import { signupType } from "@/type/sign/signupType";

type SignupState = {
  signupData: signupType;
  updateSignupState: (newData: Partial<signupType>) => void;
};

const useSignupState = create<SignupState>((set) => ({
  signupData: {
    mail: "",
    pw: "",
  },
  updateSignupState: (newData) =>
    set((state) => ({ signupData: { ...state.signupData, ...newData } })),
}));

export default useSignupState;
