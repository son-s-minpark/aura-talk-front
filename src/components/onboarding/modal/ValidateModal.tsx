"use client";
import { useSetPageStore } from "@/state/sign/usetSetPageStore";
import React, { useState } from "react";
import { useMailAuth } from "@/hooks/useAuth";
import useSignupStore from "@/state/sign/useSignupStore";

const ValidateModal = () => {
  const { setPage } = useSetPageStore();
  const [codeInput, setCodeInput] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);
  const { useMailValidateMutation, useMailResendMutation } = useMailAuth();
  const { signupData } = useSignupStore();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setPage("profile");
  };

  async function onMailSubmit() {
    if (!isSent) {
      try {
        setIsSent(true);
        const data = await useMailValidateMutation.mutateAsync(
          signupData.email
        );
        const code = data.data.code;
        if (code == codeInput) {
          setPage("profile");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        setIsSent(true);
        const data = await useMailResendMutation.mutateAsync(signupData.email);
        const code = data.data.code;
        if (code == codeInput) {
          setPage("profile");
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeInput(e.target.value);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-[#2A2A2A] rounded-[12px] text-white h-[226px] w-[303px] pt-[27px]"
    >
      <p className="text-[20px] font-bold ml-[24px]">메일 인증</p>
      <div className="w-[265px] h-[52px] flex flex-col items-center justify-center mx-[17px] mt-[27px]">
        <div className="flex items-center mx-[8px] gap-[4px]">
          <div className="bg-[#4B4B4B] h-[28px] w-[189px] rounded-[10px] px-[10px] flex items-center">
            <p>mail</p>
          </div>
          <button
            className="flex items-center justify-center rounded-[10px] bg-[#8045FF] font-bold text-[14px] h-[25px] w-[57px]"
            onClick={onMailSubmit}
          >
            {isSent ? <span>전송</span> : <span>재전송</span>}
          </button>
        </div>
        <div className="w-[265px] h-[52px] pt-[21px] flex items-center justify-center">
          <input
            value={codeInput} // 상태 값을 input에 연결
            onChange={handleCodeChange} // 입력값 변화 시 상태 업데이트
            type="text"
            name="mail"
            placeholder="코드를 입력해주세요"
            className="bg-[#4B4B4B] h-[35px] w-[247px] rounded-[10px] pl-[10px] flex items-center "
          />
        </div>
      </div>
      <div className="mb-[18px] mr-[19px] mt-[40px] flex justify-end">
        <button
          className="flex items-center justify-center rounded-[20px] bg-[#8045FF] font-bold text-[14px] h-[24px] w-[54px]"
          onClick={onSubmit}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ValidateModal;
