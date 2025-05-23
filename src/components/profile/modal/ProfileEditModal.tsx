"use client";
import React, { useState } from "react";
import { ProfileInput } from "@/components/common/ProfileInput";
import AddImage from "@/components/common/AddImage";
import InterestBtnList from "@/components/onboarding/InterestBtnList";
import ErrorMessage from "@/components/common/ErrorMessage";
import SelectBtn from "@/components/common/SelectBtn";
import { nicknameSchema, usernameSchema } from "@/schema/signSchema";
import useProfileStore from "@/state/user/useProfileStore";
import { useProfile } from "@/hooks/useProfile";
import { AxiosError } from "axios";
import { IoChevronDown } from "react-icons/io5";
import InterestModal from "@/components/onboarding/modal/InterestModal";

type ProfileEditModalProps = {
  setIsModalDown: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileEditModal = ({ setIsModalDown }: ProfileEditModalProps) => {
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
  const { useSetProfileMutation } = useProfile();

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
          const res = await useSetProfileMutation.mutateAsync({
            nickname: nickname,
            username: username,
            description: description,
            interests: profileData.interests,
          });
          if (res.success) {
            setIsModalDown(false);
          }
        } catch (error: unknown) {
          const err = error as AxiosError;
          console.error(err);
        }
      }
    }
  }

  return (
    <>
      {isInterestDown ? (
        <div onClick={(e) => e.stopPropagation()} className="modal">
          <InterestModal
            setIsInterestDown={setIsInterestDown}
            isOnBoarding={false}
          />
        </div>
      ) : (
        <div
          className="modal-content px-[20px] w-[303px] pt-[20px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <h1>대표 사진</h1>
            <AddImage imgSize={70} btnHeight={15} btnWidth={42} />
          </div>
          <div className="flex flex-col mt-[34px]">
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
              <div className="w-full h-[65px] font-bold mt-[30px] border-b-1">
                <p>관심사</p>
                <div className="flex w-full">
                  <div className="w-[300px] flex items-center flex-1 overflow-scroll">
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
            <div className="flex justify-end mt-[41px] ml-[20px] mb-[13px]">
              <SelectBtn label="완료" onClick={onSubmit} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileEditModal;
