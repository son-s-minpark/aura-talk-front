"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useImageUpload } from "@/hooks/useImageUpload";
import useUserStore from "@/state/user/useUserStore";
import useProfileImgStore from "@/state/user/useProfileImgStore";

type AddImageProps = {
  imgSize: number;
  btnHeight: number;
  btnWidth: number;
};

const AddImage = ({ imgSize, btnHeight, btnWidth }: AddImageProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { profileImgData } = useProfileImgStore();
  const { userData } = useUserStore();
  const { useProfileImageUploadMutation, useDeleteProfileImageMutation } =
    useImageUpload();
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewUrl(profileImgData.thumbnailImgUrl || "");
  }, [profileImgData]);

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files ? e.target.files[0] : null;
    if (!file) {
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);

    await useProfileImageUploadMutation.mutateAsync({
      id: userData.userId,
      file: file,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-full border-1 text-commonGray mb-[15px] relative"
        style={{ height: `${imgSize}px`, width: `${imgSize}px` }}
      >
        <Image
          src={previewUrl}
          alt="Profile"
          width={imgSize}
          height={imgSize}
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
          onClick={() => useDeleteProfileImageMutation}
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
