import { Dropdown } from "../Dropdown";

interface TaskActionsProps {
  children?: React.ReactNode;
  Icon: React.ReactNode;
}

export const TaskActions: React.FC<TaskActionsProps> = ({ children, Icon }) => {
  return <Dropdown.Root label={Icon}>{children}</Dropdown.Root>;
};
