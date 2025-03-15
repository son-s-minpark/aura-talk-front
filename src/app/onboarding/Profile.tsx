"use client";
import React, { useState } from "react";
import Input from "@/components/sign/Input";
import SignBtn from "@/components/sign/SignBtn";
import InterestModal from "@/components/sign/InterestModal";
import Back from "@/components/sign/Back";
import useSignupState from "@/state/useSignupState";
import { IoChevronDown } from "react-icons/io5";
import clsx from "clsx";
import InterestBtn from "@/components/sign/InterestBtn";
import { z } from "zod";

type ProfileProps = {
  setPage: React.Dispatch<
    React.SetStateAction<
      "onBoarding" | "signin" | "signup" | "profile" | "profileImg"
    >
  >;
};

const ProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "이름은 1글자 이상이어야 합니다." })
    .max(15, { message: "이름은 15자 이하여야 합니다." })
    .refine((val) => !val.includes(" "), {
      message: "이름에 공백이 포함되어서는 안 됩니다.",
    }),

  id: z
    .string()
    .min(3, { message: "아이디는 1글자 이상이어야 합니다." })
    .max(15, { message: "아이디는 15자 이하여야 합니다." })
    .refine((val) => !val.includes(" "), {
      message: "이름에 공백이 포함되어서는 안 됩니다.",
    }),
});

const Profile = ({ setPage }: ProfileProps) => {
  const { updateSignupState, signupData, removeInterest } = useSignupState();
  const [name, setName] = useState<string>(signupData.name);
  const [id, setId] = useState<string>(signupData.id);
  const [description, setDescription] = useState<string>(
    signupData.description
  );
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isIdValid, setIsIdValid] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>("");

  const [isInterestDown, setIsInterestDown] = useState<boolean>(false);

  const { InterestBtnSml } = InterestBtn;

  function onChageName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function onChageId(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
  }

  function onChageDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }
  function isFull() {
    return name !== "" && id !== "" && signupData.interestList.length !== 0;
  }
  function validateName() {
    const result = ProfileSchema.shape.name.safeParse(name);
    if (!result.success) {
      setIsNameValid(false);
      return result.error.errors[0].message; // 공백 포함 에러 메시지
    }
    setIsNameValid(true);
    return "";
  }

  function validateId() {
    const result = ProfileSchema.shape.id.safeParse(id);
    if (!result.success) {
      setIsIdValid(false);
      return result.error.errors[0].message; // 공백 포함 에러 메시지
    }
    setIsIdValid(true);
    return "";
  }

  function isProfileValid() {
    const nameError = validateName();
    const idError = validateId();
    if (nameError || idError) {
      setErrMsg(
        nameError && idError
          ? "이름과 아이디의 양식이 올바르지 않습니다."
          : nameError || idError
      );
      return false;
    }
    setErrMsg(""); // 에러 메시지 초기화
    return true;
  }

  function onSubmit() {
    if (!isFull()) {
      // 빈 값이 있을 때 아무것도 하지 않음
      return;
    } else {
      if (isProfileValid()) {
        updateSignupState({
          name: name,
          id: id,
          description: description,
        });
        setPage("profileImg");
      }
    }
  }

  return (
    <div className="w-full h-full">
      <div
        className={clsx("z-100 w-full h-full", {
          hidden: !isInterestDown,
        })}
      >
        <InterestModal setIsInterestDown={setIsInterestDown} />
      </div>

      <div
        className={clsx("flex flex-col items-center", {
          hidden: isInterestDown,
        })}
      >
        <Back setPage={setPage} backComponent={"signup"} />
        <div>
          <div>
            <p className="text-[20px] font-bold text-white text-center">
              프로필 입력
            </p>
          </div>
          <div className="text-[#DBDBDB] text-[14px] text-center mt-[19px]">
            <p>거의 다 끝났어요!</p>
            <p>당신에 대해 더 알려줄래요?</p>
          </div>
        </div>

        <div className="flex flex-col mt-[60px] text-white">
          <div>
            <Input
              label="이름"
              value={name}
              onChange={onChageName}
              type="text"
              isValid={isNameValid}
            />
            <Input
              label="아이디"
              value={id}
              onChange={onChageId}
              type="text"
              isValid={isIdValid}
            />
            <Input
              label="한 줄 소개"
              value={description}
              onChange={onChageDescription}
              type="text"
              isValid={true}
            />
            <div className="w-[327px] h-[58px] font-bold mt-[30px] border-b-1">
              <p>관심사</p>
              <div className="flex w-full">
                <div className="h-[38px] w-[300px] mb-[6px] flex-none flex gap-[5px] overflow-x-scroll scrollbar-hide whitespace-nowrap">
                  {signupData.interestList.map((label, index) => (
                    <div key={index} onClick={() => removeInterest(label)}>
                      <InterestBtnSml label={label} />
                    </div>
                  ))}
                </div>
                <button onClick={() => setIsInterestDown(!isInterestDown)}>
                  <IoChevronDown className="w-[20px] h-[20px] mb-[11px]" />
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              {errMsg == "" ? null : (
                <p className="text-[#C81919] text-[12px] mt-[10px]">{errMsg}</p>
              )}
            </div>
          </div>

          <div className="mt-[121px]">
            <SignBtn value="완료" isFull={isFull()} onClick={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
