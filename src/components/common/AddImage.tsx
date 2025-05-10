"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useImageUpload } from "@/hooks/useImageUpload";
import useUserStore from "@/state/user/useUserStore";
import useProfileStore from "@/state/user/useProfileStore";

type AddImageProps = {
  imgSize: number;
  btnHeight: number;
  btnWidth: number;
};

const AddImage = ({ imgSize, btnHeight, btnWidth }: AddImageProps) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { profileData } = useProfileStore();
  const { userData } = useUserStore();
  const { useProfileImageUploadMutation } = useImageUpload();

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files ? e.target.files[0] : null;
    if (!file) {
      return;
    } else {
      useProfileImageUploadMutation.mutateAsync({
        id: userData.userId,
        file: file,
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-full border-1 text-commonGray mb-[15px] relative"
        style={{ height: `${imgSize}px`, width: `${imgSize}px` }}
      >
        {profileData.profileImg.thumbnailImgUrl ? (
          <Image
            src={profileData.profileImg.thumbnailImgUrl}
            alt="Profile"
            width={imgSize}
            height={imgSize}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-full text-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="flex justify-center items-center bg-[#F3F6F6] text-commonGray rounded-[20px] text-[14px]"
        style={{ height: `${btnHeight}px`, width: `${btnWidth}px` }}
      >
        편집
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={addImage}
        className="hidden"
      />
    </div>
  );
};

export default AddImage;
