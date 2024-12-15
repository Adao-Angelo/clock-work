import "@fontsource/roboto";
import {
  BookmarkCheck,
  Ellipsis,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Settings,
  Trash,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import "./App.css";

import Modal from "react-modal";
import Button from "./components/Button";

import { toast, ToastContainer } from "./lib/react-toastify";

import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";
import { v4 } from "uuid";
import { Dropdown } from "./components/Dropdown";
import { Task } from "./components/task";
import usePreferredTheme from "./hooks/usePreferredTheme";
import { TaskType, TimerMode } from "./types";

const startTime = 1500;
const breakTime = 300;

function App() {
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<TimerMode>("tomato");

  const [timer, setTimer] = useState<number>(
    timerMode === "break" ? breakTime : startTime
  );

  const theme = usePreferredTheme();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [textAreaTask, setTextAreaTask] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  const changeTimerMode = (mode: TimerMode) => {
    setTimerMode(mode);
    setIsCounting(false);
    const time = mode == "break" ? breakTime : startTime;
    setTimer(time);
  };

  const reloadTimer = () => {
    setTimer(timerMode === "break" ? breakTime : startTime);
    setIsCounting(false);
  };

  const createTask = (taskDescription: string) => {
    const task: TaskType = {
      id: v4(),
      title: taskDescription,
      isComplete: false,
    };

    tasks.push(task);
    closeModal();
  };

  const finishTaskById = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isComplete: true } : task
    );
    setTasks(updatedTasks);
    toast("Task marked as completed");
  };

  const deleteTaskById = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    toast("Task deleted");
  };

  const playNotificationSound = () => {
    const audio = new Audio("/notify.mp3");
    audio.play().catch((error) => {
      toast.error(`Error playing sound ${error}`);
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (textAreaTask.trim()) {
      createTask(textAreaTask);
      setTextAreaTask("");
    } else {
      toast.warning("You must provide a task description.");
    }
  };

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    document.getElementById("task-input")?.focus();
  }

  function closeModal() {
    setIsOpen(false);
  }

  const sendNotificationApp = async () => {
    let permissionGranted = await isPermissionGranted();

    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === "granted";
    }

    if (permissionGranted) {
      sendNotification({ title: "Tauri", body: "Tauri is awesome!" });
    }
  };

  useEffect(() => {
    sendNotificationApp();
    if (isCounting && timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else if (timer == 0) {
      playNotificationSound();

      setIsCounting(false);
      if (timerMode == "tomato") {
        setTimerMode("break");
        setTimer(breakTime);
        toast(`Time's up! Your tomato is over.
          Press 'Play' to start a break.`);
      }
    }
  }, [timer, isCounting]);

  useEffect(() => {
    if (tasks.length === 0) {
      setIsCounting(false);
      setTimer(0);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <main className="dark:bg-zinc-900 bg-zinc-50 w-full p-[4rem] min-h-[100vh]  dark:text-zinc-50 text-zinc-900 flex justify-center items-center">
      <div className="p-[2rem] w-[40rem]">
        <div className="flex justify-between p-[2rem] rounded-md mb-[2rem]">
          <Button
            onClick={() => {
              changeTimerMode("tomato");
            }}
            className={`${
              timerMode == "tomato"
                ? "bg-violet-700 text-zinc-50 dark:bg-violet-500 rounded-sm hover:bg-violet-500 dark:hover:bg-violet-400"
                : "bg-zinc-200  dark:bg-zinc-800  rounded-sm hover:bg-zinc-300 dark:hover:bg-zinc-700"
            } p-[1rem] font-bold font-roboto text-2xl w-[48%]`}
          >
            Tomato
          </Button>
          <Button
            onClick={() => {
              changeTimerMode("break");
            }}
            className={`${
              timerMode == "break"
                ? "bg-violet-700 text-zinc-50 dark:bg-violet-500 rounded-sm hover:bg-violet-500 dark:hover:bg-violet-400"
                : "bg-zinc-200  dark:bg-zinc-800  rounded-sm hover:bg-zinc-300 dark:hover:bg-zinc-700"
            } p-[1rem] font-bold font-roboto text-2xl w-[48%]`}
          >
            Break
          </Button>
        </div>

        <h1 className="font-roboto font-semibold text-9xl text-center ">
          {`${minutes}:${seconds}`}
        </h1>

        <div className="flex w-[30rem] m-auto justify-between my-[4rem] ">
          <Button
            className="text-violet-700 dark:text-violet-400"
            onClick={reloadTimer}
          >
            <RotateCcw></RotateCcw>
          </Button>
          <Button
            disabled={Number(timer) <= 0 ? true : false}
            onClick={() => {
              setIsCounting(!isCounting);
            }}
            className="text-violet-700 dark:text-violet-400"
          >
            {isCounting ? <Pause></Pause> : <Play></Play>}
          </Button>
          <Button
            className="text-violet-700 dark:text-violet-400"
            onClick={openModal}
          >
            <Plus></Plus>
          </Button>
          <Button className="text-violet-700 dark:text-violet-400">
            <Settings></Settings>
          </Button>
        </div>

        <div className="w-[full] grid gap-[1rem]  p-[2rem]">
          {tasks.map((task) => (
            <Task.Root key={task.id}>
              <Task.Icon isCompleted={task.isComplete} />
              <Task.Content
                isCompleted={task.isComplete}
                content={task.title}
              />
              <Task.Action Icon={<Ellipsis></Ellipsis>}>
                <Dropdown.Header>
                  <span className="block truncate text-2xl font-roboto font-medium">
                    Task actions
                  </span>
                </Dropdown.Header>
                <Dropdown.Item
                  onClick={() => {
                    deleteTaskById(task.id);
                  }}
                >
                  <div className="flex items-center gap-[1rem]">
                    <Trash size={24} /> Delete task
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    finishTaskById(task.id);
                  }}
                >
                  <div className="flex items-center gap-[1rem]">
                    <BookmarkCheck size={24} />
                    finish
                  </div>
                </Dropdown.Item>
              </Task.Action>
            </Task.Root>
          ))}
        </div>
      </div>

      <ToastContainer theme={theme} />

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        overlayClassName="p-[30rem] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ease-out"
        className="w-[30rem] sm:w-[40rem] dark:text-zinc-50 text-zinc-900 bg-zinc-50 dark:bg-zinc-900 rounded-lg p-[2rem] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out scale-95 opacity-0"
        style={{
          overlay: modalIsOpen ? { opacity: 1 } : { opacity: 0 },
          content: modalIsOpen
            ? { transform: "translate(-50%, -50%) scale(1)", opacity: 1 }
            : { transform: "translate(-50%, -50%) scale(0.95)", opacity: 0 },
        }}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-between items-center mb-[2rem]">
              <h2 className="text-2xl">Create new task.</h2>
              <Button onClick={closeModal}>
                <X className="text-violet-700 dark:text-violet-400" />
              </Button>
            </div>
            <textarea
              className="w-full bg-zinc-100 dark:bg-zinc-800 font-roboto text-2xl p-[1rem] outline-none rounded-md"
              placeholder="Enter your task"
              value={textAreaTask}
              onChange={(e) => setTextAreaTask(e.target.value)}
              id="task-input"
            ></textarea>
          </div>
          <div className="flex justify-between w-full my-[1rem]">
            <Button
              className="bg-violet-600 text-zinc-50 text-center w-full flex gap-[1rem] items-center font-roboto font-medium text-2xl rounded-md p-[1rem] hover:bg-violet-500"
              type="submit"
            >
              <p className="m-auto">Save task</p>
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
