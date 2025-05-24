"use client";
import React, { useState } from "react";
import { useMailAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { setPage } from "@/store/sign/setPage";

const ValidateModal = ({ email }: { email: string }) => {
  const dispatch = useDispatch();
  const [codeInput, setCodeInput] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);
  const { useMailValidateMutation, useMailResendMutation } = useMailAuth();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setPage("profile"));
  };

  async function onMailSubmit() {
    if (!isSent) {
      try {
        setIsSent(true);
        const data = await useMailValidateMutation.mutateAsync(email);
        console.error(data);
        const code = data.data.code;
        if (code == codeInput) {
          dispatch(setPage("profile"));
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const data = await useMailResendMutation.mutateAsync(email);
        console.error(data);
        const code = data.data.code;
        if (code == codeInput) {
          dispatch(setPage("profile"));
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
      <h1 className="ml-[24px]">메일 인증</h1>
      <div className="w-[265px] h-[52px] flex flex-col items-center justify-center mx-[17px] mt-[27px]">
        <div className="flex items-center mx-[8px] gap-[4px]">
          <div className="bg-[#4B4B4B] h-[28px] w-[189px] rounded-[10px] px-[10px] flex items-center">
            <p>{email}</p>
          </div>
          <button
            className="flex items-center justify-center rounded-[10px] bg-[#8045FF] font-bold text-[14px] h-[25px] w-[57px]"
            onClick={onMailSubmit}
          >
            {!isSent ? <span>전송</span> : <span>재전송</span>}
          </button>
        </div>
        <div className="w-[265px] h-[52px] pt-[21px] flex items-center justify-center">
          <input
            value={codeInput}
            onChange={handleCodeChange}
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
