import React, { useState } from "react";
import { IoMdKey } from "react-icons/io";
import PwInput from "../PwInput";
import SelectBtn from "../../common/SelectBtn";

const ChangePwModal = () => {
  const [currPw, setCurrPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [checkNewPw, setCheckNewPw] = useState<string>("");
  const [isCurrValid, setIsCurrValid] = useState<boolean>(true);
  const [isNewPwValid, setIsNewPwValid] = useState<boolean>(true);
  const [isCheckNewPwValid, setIsCheckNewPwValid] = useState<boolean>(true);

  function onChangecurrPw(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrPw(e.target.value);
  }

  function onChangeNewPw(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPw(e.target.value);
  }

  function onChangeCheckNewPw(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckNewPw(e.target.value);
  }

  return (
    <div className=" w-[281px] h-[335px] bg-[var(--color-background)] rounded-[12px]">
      <div className="flex items-center pt-[28px] pl-[25px] gap-[10px]">
        <IoMdKey className=" w-[30px] h-[30px]" />
        <p className="text-[20px] font-bold"> 비밀번호 변경 </p>
      </div>
      <div className="px-[25px]">
        <PwInput
          label="현재 비밀번호"
          isValid={isCurrValid}
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
          isValid={isCheckNewPwValid}
          value={checkNewPw}
          onChange={onChangeCheckNewPw}
        />
      </div>
      <div className="flex items-end justify-end mt-[44px] mr-[24px]">
        <SelectBtn label="완료" onClick={() => console.log("완")} />
      </div>
    </div>
  );
};

export default ChangePwModal;
