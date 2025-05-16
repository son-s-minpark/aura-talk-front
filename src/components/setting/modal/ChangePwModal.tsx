import React, { useState } from "react";
import { IoMdKey } from "react-icons/io";
import { PwInput } from "@/components/common/ProfileInput";
import SelectBtn from "@/components/common/SelectBtn";
import { validatePw } from "@/util/validate/signValidate";
import ErrorMessage from "@/components/common/ErrorMessage";

const ChangePwModal = () => {
  const [currPw, setCurrPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [checkNewPw, setCheckNewPw] = useState<string>("");
  const [isCurrPwValid, setIsCurrPwValid] = useState<boolean>(true);
  const [isNewPwValid, setIsNewPwValid] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>("");

  function onChangecurrPw(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrPw(e.target.value);
  }

  function onChangeNewPw(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPw(e.target.value);
  }

  function onChangeCheckNewPw(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckNewPw(e.target.value);
  }

  function isFull() {
    return currPw != "" && newPw != "" && checkNewPw != "";
  }

  function validatePassword(pw: string, setPwValid: (valid: boolean) => void) {
    const pwError = validatePw(pw);
    setPwValid(!pwError);
    if (pwError) {
      setErrMsg(pwError);
      return false;
    }
    return true;
  }

  function isChangePwValid() {
    const isCurrValid = validatePassword(currPw, setIsCurrPwValid);
    if (!isCurrValid) {
      return;
    }

    const isNewValid = validatePassword(newPw, setIsNewPwValid);
    if (isNewValid) {
      if (newPw != checkNewPw) {
        setErrMsg("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        setIsNewPwValid(false);
        return false;
      } else if (newPw == currPw) {
        setErrMsg("현재 비밀번호와 변경 비밀번호가 동일할 수 없습니다.");
        setIsNewPwValid(false);
        setIsCurrPwValid(false);
        return false;
      }
    }

    return isCurrValid && isNewValid;
  }

  function onSubmit() {
    if (!isFull()) return;
    else {
      if (isChangePwValid()) {
        setErrMsg("");
        // 대충 비밀변호 변경 요청
      }
    }
  }

  return (
    <div className="modal-content w-[281px]">
      <div className="flex items-center pt-[28px] pl-[25px] gap-[10px]">
        <IoMdKey className=" w-[30px] h-[30px]" />
        <p className="text-[20px] font-bold"> 비밀번호 변경 </p>
      </div>
      <div className="px-[25px]">
        <div className="w-[221px]">
          <PwInput
            label="현재 비밀번호"
            isValid={isCurrPwValid}
            value={currPw}
            onChange={onChangecurrPw}
          />
          <PwInput
            label="변경 비밀번호"
            isValid={isNewPwValid}
            value={newPw}
            onChange={onChangeNewPw}
          />
          <PwInput
            label="변경 비밀번호 확인"
            isValid={isNewPwValid}
            value={checkNewPw}
            onChange={onChangeCheckNewPw}
          />
        </div>
        <div className="flex justify-center">
          {errMsg != "" && <ErrorMessage msg={errMsg} />}
        </div>
      </div>
      <div className="flex items-end justify-end mt-[44px] mr-[24px] pb-[16px]">
        <SelectBtn label="완료" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default ChangePwModal;
