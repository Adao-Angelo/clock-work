import { BookmarkCheck, Trash } from "lucide-react";
import { Dropdown } from "../Dropdown";

interface TaskActionsProps {
  children?: React.ReactNode;
}
export const TaskActions: React.FC<TaskActionsProps> = ({ children }) => {
  return (
    <Dropdown.Root label={children}>
      <Dropdown.Header>
        <span className="block truncate text-2xl font-roboto font-medium">
          Task actions
        </span>
      </Dropdown.Header>
      <Dropdown.Item>
        <div className="flex items-center gap-[1rem]">
          <Trash size={24} /> Delete task
        </div>
      </Dropdown.Item>
      <Dropdown.Item>
        <div className="flex items-center gap-[1rem]">
          <BookmarkCheck size={24} />
          finish
        </div>
      </Dropdown.Item>
    </Dropdown.Root>
  );
};
