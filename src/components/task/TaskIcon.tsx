import { Clipboard, ClipboardCheck } from "lucide-react";

interface TaskIconProps {
  isCompleted?: boolean;
}

export const TaskIcon: React.FC<TaskIconProps> = ({ isCompleted }) => {
  return (
    <div
      className={`flex gap-[1rem] items-center ${
        isCompleted ? "text-zinc-500" : ""
      }`}
    >
      {isCompleted ? <ClipboardCheck /> : <Clipboard></Clipboard>}
    </div>
  );
};
