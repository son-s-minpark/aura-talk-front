"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

type AddImageProps = {
  imgSize: number;
  btnHeight: number;
  btnWidth: number;
  img: string;
  setImg: (params: { fileName: string; file: File }) => void;
  deleteImg?: () => void;
};

const AddImage = ({
  imgSize,
  btnHeight,
  btnWidth,
  img,
  setImg,
  deleteImg,
}: AddImageProps) => {
  const [prevImg, setPrevImg] = useState<string>(img);
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

    if (setImg) {
      setImg({
        fileName: file.name,
        file: file,
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-full border-1 text-commonGray mb-[15px] relative overflow-hidden"
        style={{ height: `${imgSize}px`, width: `${imgSize}px` }}
      >
        {prevImg ? (
          <Image
            src={prevImg}
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <div className="bg-[var(--color-commonGray)]" />
        )}
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
          onClick={() => deleteImg}
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
