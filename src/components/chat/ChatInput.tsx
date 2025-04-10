"use client";
import { chatSchema } from "@/schema/chatSchema";
import React, { useState, useRef } from "react";
import { FaPaperclip } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const ChatInput: React.FC = () => {
  const INITIAL_HEIGHT = 30;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState<number>(INITIAL_HEIGHT);
  const [chatValue, setChatValue] = useState<string>("");

  function handleInput() {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${INITIAL_HEIGHT}px`;
      const newHeight = Math.max(INITIAL_HEIGHT, textarea.scrollHeight);
      setHeight(newHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }

  function onChangeChatValue(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length >= 300) {
    } else {
      setChatValue(e.target.value);
    }
  }

  function sendChat() {
    if (chatSchema.shape.sentchat.safeParse(chatValue).success) {
      // 성공 시 보내기
    } else {
      // 예외 처리
    }
  }

  return (
    <div
      className="w-full border-t border-commonGray"
      style={{ height: height + 16 }}
    >
      <div className="flex items-center px-[17px] py-[8px] gap-[15px]">
        <button>
          <FaPaperclip className="w-[24px] h-[24px] text-[var(--color-gray)]" />
        </button>
        <div
          className="w-[268px] rounded-[12px] bg-[#F3F6F6] dark:bg-[#4B4B4B] px-[2px] flex items-center"
          style={{ minHeight: height }}
        >
          <textarea
            ref={textareaRef}
            className="w-full resize-none overflow-hidden text-[14px] leading-normal box-border py-[2px] px-[4px]"
            style={{ height: height, minHeight: INITIAL_HEIGHT }}
            onInput={handleInput}
            onChange={onChangeChatValue}
            value={chatValue}
          />
        </div>
        <button onClick={sendChat}>
          <IoSend className="w-[24px] h-[24px] text-[var(--color-gray)]" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
