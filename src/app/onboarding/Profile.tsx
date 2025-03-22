"use client";
import React, { useState } from "react";
import Input from "@/components/sign/Input";
import SignBtn from "@/components/sign/SignBtn";
import InterestModal from "@/components/sign/InterestModal";
import Back from "@/components/sign/Back";
import useSignupState from "@/state/signState/useSignupState";
import { IoChevronDown } from "react-icons/io5";
import clsx from "clsx";
import { nicknameSchema, usernameSchema } from "@/schema/signSchema";
import InterestBtnList from "@/components/sign/InterestBtnList";
import { setPageType } from "@/type/onboarding/setPageType";
import useAuth from "@/hooks/useAuth";

const Profile = ({ setPage }: setPageType) => {
  const { updateSignupState, signupData } = useSignupState();
  const [nickname, setnickname] = useState<string>(signupData.nickname);
  const [username, setusername] = useState<string>(signupData.username);
  const [description, setDescription] = useState<string>(
    signupData.description
  );
  const [isnicknameValusername, setIsnicknameValusername] =
    useState<boolean>(true);
  const [isusernameValusername, setIsusernameValusername] =
    useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>("");
  const [isInterestDown, setIsInterestDown] = useState<boolean>(false);
  const { useSignupMutation } = useAuth();

  function onChangeNickname(e: React.ChangeEvent<HTMLInputElement>) {
    setnickname(e.target.value);
  }

  function onChangeusername(e: React.ChangeEvent<HTMLInputElement>) {
    setusername(e.target.value);
  }

  function onChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }
  function isFull() {
    return (
      nickname !== "" && username !== "" && signupData.interestList.length !== 0
    );
  }
  function valusernameatenickname() {
    const result = nicknameSchema.shape.nickname.safeParse(nickname);
    if (!result.success) {
      setIsnicknameValusername(false);
      return result.error.errors[0].message;
    }
    setIsnicknameValusername(true);
    return "";
  }

  function valusernameateusername() {
    const result = usernameSchema.shape.username.safeParse(username);
    if (!result.success) {
      setIsusernameValusername(false);
      return result.error.errors[0].message;
    }
    setIsusernameValusername(true);
    return "";
  }

  function isProfileValusername() {
    const nicknameError = valusernameatenickname();
    const usernameError = valusernameateusername();
    if (nicknameError || usernameError) {
      setErrMsg(
        nicknameError && usernameError
          ? "이름과 아이디의 양식이 올바르지 않습니다."
          : nicknameError || usernameError
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
      if (isProfileValusername()) {
        updateSignupState({
          nickname: nickname,
          username: username,
          description: description,
        });
        const res = useSignupMutation.mutate({
          mail: signupData.mail,
          pw: signupData.pw,
          nickname: nickname,
          username: username,
          description: description,
          interestList: signupData.interestList,
        });
        setPage("profileImg");
      }
    }
  }

  return (
    <div className="w-full h-full">
      <div
        className={clsx("w-full h-full", {
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
        <div className="mt-[69px]">
          <div className="text-center">
            <p className="text-[20px] font-bold text-white leading-[20px]">
              프로필 입력
            </p>
            <div className="text-[#DBDBDB] text-[14px] leading-[20px] mt-[19px]">
              <p>거의 다 끝났어요!</p>
              <p>당신에 대해 더 알려줄래요?</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-[35px] text-white">
          <div>
            <Input
              label="이름"
              value={nickname}
              onChange={onChangeNickname}
              type="text"
              isValid={isnicknameValusername}
            />
            <Input
              label="아이디"
              value={username}
              onChange={onChangeusername}
              type="text"
              isValid={isusernameValusername}
            />
            <Input
              label="한 줄 소개"
              value={description}
              onChange={onChangeDescription}
              type="text"
              isValid={true}
            />
            <div className="w-[327px] h-[65px] font-bold mt-[30px] border-b-1">
              <p>관심사</p>
              <div className="flex w-full">
                <div className="w-[300px] flex items-center">
                  <InterestBtnList isScrollable={true} />
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

          <div className="mt-[101px]">
            <SignBtn value="완료" isFull={isFull()} onClick={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
