import React, { ReactNode } from "react";

interface ContainerProps {
  height: number;
  children: ReactNode;
}

const Container = ({ height, children }: ContainerProps) => {
  return (
    <div
      className="rounded-t-[20px] bg-[var(--color-background)] w-full"
      style={{ height: `${height}px` }}
    >
      {children}
    </div>
  );
};

export default Container;
