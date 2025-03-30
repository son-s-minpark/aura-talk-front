import clsx from "clsx";
import React from "react";

type chatType = {
  name: string;
  text: string;
  time: string;
};

const ChatBubble = ({ chat }: { chat: chatType }) => {
  return (
    <div
      className={clsx("w-full flex flex-col gap-[8px]", {
        "justify-end": chat.name === "me",
        "justify-start": chat.name !== "me",
      })}
    >
      <div
        className={clsx("px-[13px] py-[12px] max-w-[216px] rounded-b-[12px]", {
          "bg-[var(--color-point)] text-white self-end rounded-tl-[12px]":
            chat.name === "me",
          "bg-[#F2F7FB] dark:bg-[#4B4B4B] text-[var(--color-gray)] self-start rounded-tr-[12px]":
            chat.name !== "me",
        })}
      >
        <p> {chat.text} </p>
      </div>
      <p
        className={clsx("text-[#797C7B] text-[10px]", {
          "self-end": chat.name === "me",
          "self-start": chat.name !== "me",
        })}
      >
        {chat.time}
      </p>
    </div>
  );
};

export default ChatBubble;
