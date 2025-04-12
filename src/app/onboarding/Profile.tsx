"use client";
import React, { useState } from "react";
import { ProfileInput } from "@/components/common/ProfileInput";
import SignBtn from "@/components/onboarding/SignBtn";
import InterestModal from "@/components/onboarding/modal/InterestModal";
import Back from "@/components/onboarding/Back";
import useProfileStore from "@/state/sign/useProfileStore";
import { IoChevronDown } from "react-icons/io5";
import clsx from "clsx";
import { nicknameSchema, usernameSchema } from "@/schema/signSchema";
import InterestBtnList from "@/components/onboarding/InterestBtnList";
import { useAuth } from "@/hooks/useAuth";
import { useSetPageStore } from "@/state/sign/usetSetPageStore";
import ErrorMessage from "@/components/common/ErrorMessage";
import { AxiosError } from "axios";

const Profile = () => {
  const { setProfileData, profileData } = useProfileStore();
  const [nickname, setnickname] = useState<string>(profileData.nickname);
  const [username, setusername] = useState<string>(profileData.username);
  const [description, setDescription] = useState<string>(
    profileData.description
  );
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(true);
  const [isusernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>("");
  const [isInterestDown, setIsInterestDown] = useState<boolean>(false);
  const { useProfileMutation } = useAuth();
  const { setPage } = useSetPageStore();

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
      nickname !== "" && username !== "" && profileData.interests.length !== 0
    );
  }
  function validateNickname() {
    const result = nicknameSchema.shape.nickname.safeParse(nickname);
    if (!result.success) {
      setIsNicknameValid(false);
      return result.error.errors[0].message;
    }
    setIsNicknameValid(true);
    return "";
  }

  function validateUsername() {
    const result = usernameSchema.shape.username.safeParse(username);
    if (!result.success) {
      setIsUsernameValid(false);
      return result.error.errors[0].message;
    }
    setIsUsernameValid(true);
    return "";
  }

  function isProfileValid() {
    const nicknameError = validateNickname();
    const usernameError = validateUsername();
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

  async function onSubmit() {
    if (!isFull()) {
      // 빈 값이 있을 때 아무것도 하지 않음
      return;
    } else {
      if (isProfileValid()) {
        setProfileData({
          nickname: nickname,
          username: username,
          description: description,
        });
        try {
          const res = await useProfileMutation.mutateAsync({
            nickname: nickname,
            username: username,
            description: description,
            interests: profileData.interests,
          });
          console.error(res);
          setPage("profileImg");
        } catch (error: unknown) {
          const err = error as AxiosError;
          console.error(err);
        }
      }
    }
  }

  return (
    <div className="w-full h-full text-white">
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
        <Back backComponent={"signup"} />
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
            <ProfileInput
              label="이름"
              value={nickname}
              onChange={onChangeNickname}
              isValid={isNicknameValid}
            />
            <ProfileInput
              label="아이디"
              value={username}
              onChange={onChangeusername}
              isValid={isusernameValid}
            />
            <ProfileInput
              label="한 줄 소개"
              value={description}
              onChange={onChangeDescription}
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
              {errMsg != "" && <ErrorMessage msg={errMsg} />}
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
