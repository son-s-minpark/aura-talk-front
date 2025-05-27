"use client";
import React, { useRef, useState } from "react";
import { useImageUpload } from "@/hooks/useImageUpload";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type AddImageProps = {
  imgSize: number;
  btnHeight: number;
  btnWidth: number;
};

const AddImage = ({ imgSize, btnHeight, btnWidth }: AddImageProps) => {
  const profileImg = useSelector((state: RootState) => state.profileImg);
  const [prevImg, setPrevImg] = useState<string>(profileImg.thumbnailImgUrl);
  const { useProfileImageUploadMutation, useDeleteProfileImageMutation } =
    useImageUpload();
  const fileRef = useRef<HTMLInputElement>(null);

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files ? e.target.files[0] : null;
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setPrevImg(reader.result as string);
      }
    };

    reader.readAsDataURL(file);

    await useProfileImageUploadMutation.mutateAsync({
      fileName: file.name,
      file: file,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-full border-1 text-commonGray mb-[15px] relative overflow-hidden"
        style={{ height: `${imgSize}px`, width: `${imgSize}px` }}
      >
        <Image
          src={prevImg}
          alt="Profile"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex gap-[15px]">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex justify-center items-center bg-[#F3F6F6] text-commonGray rounded-[20px] text-[14px]"
          style={{ height: `${btnHeight}px`, width: `${btnWidth}px` }}
        >
          편집
        </button>
        <button
          type="button"
          onClick={() => useDeleteProfileImageMutation.mutateAsync()}
          className="flex justify-center items-center bg-[var(--color-errorRed)] text-white rounded-[20px] text-[14px]"
          style={{ height: `${btnHeight}px`, width: `${btnWidth}px` }}
        >
          삭제
        </button>
      </div>
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
