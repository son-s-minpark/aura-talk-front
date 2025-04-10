import React from "react";
type ErrorMeassgeProp = {
  msg: string;
};

const ErrorMessage = ({ msg }: ErrorMeassgeProp) => {
  return (
    <p className="text-[var(--color-errorRed)] text-[12px] mt-[10px]">{msg}</p>
  );
};

export default ErrorMessage;
