import clsx from "clsx";
import { ReactNode } from "react";

interface PropsContainer {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className = "" }: PropsContainer) => {
  const combinedClasses = clsx("max-w-[930px] mx-auto px-4", className);

  return <div className={combinedClasses}>{children}</div>;
};
