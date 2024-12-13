import { Clipboard, ClipboardCheck } from "lucide-react";

interface TaskIconProps {
  isComplete?: boolean;
}

export const TaskIcon: React.FC<TaskIconProps> = ({ isComplete }) => {
  return (
    <div
      className={`flex gap-[1rem] items-center ${
        isComplete ? "text-zinc-500" : ""
      }`}
    >
      {isComplete ? <ClipboardCheck /> : <Clipboard></Clipboard>}
    </div>
  );
};
