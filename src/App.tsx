import "@fontsource/roboto";
import { Ellipsis, Pause, Play, Plus, RotateCcw, X } from "lucide-react";

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
import { Task } from "./components/task";

function App() {
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(5);
  const [modalIsOpen, setIsOpen] = useState(false);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  const reloadTimer = () => {
    setTimer(5);
    toast("You reset the timer");
  };

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {}

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
      toast("Time's up!");
    }
  }, [timer, isCounting]);

  return (
    <main className="bg-zinc-900 w-full p-[4rem] min-h-[100vh] text-zinc-50 flex justify-center items-center">
      <div className="p-[2rem] w-[40rem]">
        <h1 className="font-roboto font-semibold text-9xl text-center ">
          {`${minutes}:${seconds}`}
        </h1>

        <div className="flex w-[30rem] m-auto justify-between my-[4rem] ">
          <Button onClick={reloadTimer}>
            <RotateCcw className="text-violet-400"></RotateCcw>
          </Button>
          <Button
            onClick={() => {
              setIsCounting(!isCounting);
            }}
          >
            {isCounting ? (
              <Pause className="text-violet-400"></Pause>
            ) : (
              <Play className="text-violet-400"></Play>
            )}
          </Button>
          <Button onClick={openModal}>
            <Plus className="text-violet-400"></Plus>
          </Button>
        </div>

        <div className="w-[full] grid gap-[1rem]  p-[2rem]">
          <Task.Root>
            <Task.Icon />
            <Task.Content content="Create a new nod app" />
            <Task.Action>
              <Ellipsis />
            </Task.Action>
          </Task.Root>
          <Task.Root>
            <Task.Icon isComplete />
            <Task.Content
              content="Desktop app built with Tauri (React + Rust) for enhanced focus and productivity. "
              isCompleted
            />
            <Task.Action>
              <Ellipsis />
            </Task.Action>
          </Task.Root>
          <Task.Root>
            <Task.Icon />
            <Task.Content content="Create a new nod app" />
            <Task.Action>
              <Ellipsis />
            </Task.Action>
          </Task.Root>
          <Task.Root>
            <Task.Icon />
            <Task.Content content="Create a new nod app" />
            <Task.Action>
              <Ellipsis />
            </Task.Action>
          </Task.Root>
        </div>
      </div>

      <ToastContainer theme="dark" />

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        overlayClassName="p-[30rem] fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ease-out"
        className="w-[30rem] sm:w-[40rem] text-zinc-50 bg-zinc-900 rounded-lg p-[2rem] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out scale-95 opacity-0"
        style={{
          overlay: modalIsOpen ? { opacity: 1 } : { opacity: 0 },
          content: modalIsOpen
            ? { transform: "translate(-50%, -50%) scale(1)", opacity: 1 }
            : { transform: "translate(-50%, -50%) scale(0.95)", opacity: 0 },
        }}
      >
        <div>
          <div>
            <div className="flex justify-between items-center mb-[2rem]">
              <h2 className="text-2xl">Create new task.</h2>
              <Button onClick={closeModal}>
                <X className="text-violet-400"></X>
              </Button>
            </div>
            <textarea
              className="w-full bg-zinc-800 font-roboto text-2xl p-[1rem] outline-none rounded-md"
              placeholder="Enter your task"
            ></textarea>
          </div>
          <div className="flex justify-between w-full my-[1rem]">
            <Button
              className="bg-violet-600 text-center w-full flex gap-[1rem] items-center font-roboto font-medium text-2xl rounded-md p-[1rem] hover:bg-violet-500"
              type="submit"
            >
              <p className="m-auto">Save task</p>
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default App;
