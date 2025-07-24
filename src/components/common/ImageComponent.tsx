import React from "react";
import Image from "next/image";

const ImageComponent = ({ size, img }: { size: number; img: string }) => {
  return (
    <div
      className="rounded-full border-1 border-[var(--color-commonGray)] relative overflow-hidden"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {img && (
        <Image src={img} alt="" fill className="rounded-full object-cover" />
      )}
    </div>
  );
};

export default ImageComponent;
