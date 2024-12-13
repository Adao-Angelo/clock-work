import React from "react";

interface TaskRootProps {
  children: React.ReactNode;
  className?: string;
}

export const TaskRoot: React.FC<TaskRootProps> = ({ children, className }) => {
  return (
    <div
      className={`flex items-start gap-[1.5rem]  text-zinc-50 justify-between bg-zinc-950 p-[1rem] rounded-md ${className}`}
    >
      {children}
    </div>
  );
};
