import { Ellipsis } from "lucide-react";
import Button from "../Button";

interface TaskActionsProps {
  children: React.ReactNode;
}
export const TaskActions: React.FC<TaskActionsProps> = ({ children }) => {
  return <Button className="text-zinc-50">{children || <Ellipsis />}</Button>;
};
