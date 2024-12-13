interface TaskContentProps {
  content: string;
  isCompleted?: boolean;
}

export const TaskContent: React.FC<TaskContentProps> = ({
  content,
  isCompleted,
}) => {
  return (
    <p
      className={`font-roboto font-light text-2xl ${
        isCompleted ? "line-through text-zinc-500" : ""
      }`}
    >
      {content}
    </p>
  );
};
