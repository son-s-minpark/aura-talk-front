"use client";
import React, { useState } from "react";
import Back from "@/components/onboarding/Back";
import SignBtn from "@/components/onboarding/SignBtn";
import InterestBtnList from "@/components/onboarding/InterestBtnList";
import AddImage from "@/components/common/AddImage";
import TermsModal from "@/components/onboarding/modal/TermsModal";
import Introduction from "@/components/onboarding/Introduction";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useImageUpload } from "@/hooks/useImageUpload";

const ProfileImg = () => {
  const user = useSelector((state: RootState) => state.user);
  const [termsModalDown, setTermsModalDown] = useState<boolean>(false);
  const [file, setFile] = useState<{ file: File; fileName: string } | null>(
    null
  );
  const { useUploadProfileImage, useDeleteProfileImage } = useImageUpload();

  function onSubmit() {
    if (file) {
      useUploadProfileImage
        .mutateAsync({
          file: file.file,
          fileName: file.fileName,
        })
        .then((res) => {
          if (res?.success) {
            setTermsModalDown(true);
          } else {
            throw new Error("이미지 업로드 에러");
          }
        });
    }
  }

  return (
    <div className="w-full h-full overflow-scroll text-white">
      {termsModalDown && (
        <div className="modal" onClick={() => setTermsModalDown(false)}>
          <TermsModal />
        </div>
      )}

      <Back backComponent={"profile"} />
      <div className="mt-[24px]">
        <Introduction page="profileImg" />
      </div>
      <div className="mt-[35px] mb-[15px]">
        <AddImage
          imgSize={100}
          btnHeight={24}
          btnWidth={54}
          img={user.profileImage.thumbnailImageUrl}
          setImg={({ file, fileName }) =>
            setFile({ file: file, fileName: fileName })
          }
          deleteImg={useDeleteProfileImage.mutateAsync}
        />
      </div>
      <div className="flex flex-col mt-[55px] ml-[37px] gap-[22px]">
        <>
          <p className="text-lightGray text-[14px] leading-[14px]">
            사용자 이름
          </p>
          <p className="text-white text-[18px] font-semibold mt-[12px]">
            {user.nickname}
          </p>
        </>
        <>
          <p className="text-lightGray text-[14px] leading-[14px]">아이디</p>
          <p className="text-white text-[18px] font-semibold mt-[12px]">
            {user.username}
          </p>
        </>
        <>
          <p className="text-lightGray text-[14px] leading-[14px]">
            한 줄 소개
          </p>
          <p className="text-white text-[18px] font-semibold mt-[12px]">
            {user.description}
          </p>
        </>
        <>
          <p className="text-lightGray text-[14px] leading-[14px]">관심사</p>
          <div className="w-[300px] mb-[6px] flex-none flex gap-[5px] flex-wrap text-white text-[18px] font-semibold mt-[12px]">
            <InterestBtnList isScrollable={true} />
          </div>
        </>
      </div>

      <div className="flex justify-center mt-[56px]">
        <SignBtn value="가입하기" isFull={true} onClick={onSubmit} />
      </div>
    </div>
  );
};

export default ProfileImg;
