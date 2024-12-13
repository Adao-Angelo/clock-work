import { Dropdown } from "../Dropdown";

interface TaskActionsProps {
  children?: React.ReactNode;
}
export const TaskActions: React.FC<TaskActionsProps> = ({ children }) => {
  return (
    <Dropdown.Root Icon={children}>
      <Dropdown.Header>
        <span className="block truncate text-2xl font-roboto font-medium">
          Task actions
        </span>
      </Dropdown.Header>
      <Dropdown.Item>H</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
    </Dropdown.Root>
  );
};
