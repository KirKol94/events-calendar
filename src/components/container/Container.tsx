import { ReactNode } from "react";

interface PropsContainer {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: PropsContainer) => {
  return (
    <div className={`max-w-[930px] mx-auto px-4 ${className}`}>{children}</div>
  );
};
