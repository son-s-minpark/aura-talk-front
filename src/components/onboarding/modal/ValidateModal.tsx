import { useSetPageState } from "@/state/signState/usetSetPageState";
import React, { useRef } from "react";

const ValidateModal = () => {
  const { setPage } = useSetPageState();
  const mailInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mailInputRef.current) {
      const mailValue = mailInputRef.current.value;
      console.log("Submitted email:", mailValue);
      setPage("profile");
    }
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
          <button className="flex items-center justify-center rounded-[10px] bg-[#8045FF] font-bold text-[14px] h-[25px] w-[57px]">
            전송
          </button>
        </div>
        <div className="w-[265px] h-[52px] pt-[21px] flex items-center justify-center">
          <input
            ref={mailInputRef}
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
