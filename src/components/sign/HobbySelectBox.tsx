import React from "react";

type InterestSelectBoxProps = {
  name: string;
};

const InterestSelectBox = ({ name }: InterestSelectBoxProps) => {
  return (
    <div className="text-white">
      <p>{name}</p>
      <div></div>
    </div>
  );
};

export default InterestSelectBox;
