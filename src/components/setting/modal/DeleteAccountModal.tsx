"use client";
import React, { useState } from "react";
import SelectBtn from "../../common/SelectBtn";
import { MdPersonOff } from "react-icons/md";
import { PwInput } from "@/components/common/ProfileInput";
import useAuth from "@/hooks/useAuth";
import { validatePw } from "@/util/validate/signValidate";
import ErrorMessage from "@/components/common/ErrorMessage";

const id = "1";

const DeleteAccountModal = () => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [pw, setPw] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const { useDeleteAccoutMutation } = useAuth();
  const { mutateAsync } = useDeleteAccoutMutation(id);

  function onChangePw(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }

  function validatePassword() {
    const pwError = validatePw(pw);
    setIsValid(!pwError);
    if (pwError) {
      setErrMsg(pwError);
      return false;
    }
    return true;
  }

  async function onSubmit() {
    if (pw == "") {
      return;
    } else {
      if (validatePassword()) {
        setErrMsg("");
      }
    }
    const res = await mutateAsync({ password: pw });
    console.error(res);
  }

  return (
    <div className="w-[281px] py-[28px] px-[22px] modal-content">
      <div className="flex">
        <MdPersonOff className="w-[30px] h-[30px] text-[#787878] dark:text-lightGray" />
        <p className="text-[20px] font-bold ml-[14px]">회원탈퇴</p>
      </div>
      <div className="flex flex-col mt-[16px] w-full">
        <p className="text-[12px]"> 탈퇴하면 이전 기록에 접근할 수 없어요.</p>
        <PwInput
          label="현재 비밀번호"
          isValid={isValid}
          onChange={onChangePw}
          value={pw}
        />
      </div>
      <div className="flex justify-center">
        {errMsg != "" && <ErrorMessage msg={errMsg} />}
      </div>
      <div className="flex justify-end mt-[26px]">
        <SelectBtn label="확인" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default DeleteAccountModal;
