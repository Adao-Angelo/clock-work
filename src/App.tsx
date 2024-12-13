import "@fontsource/roboto";
import {
  Clipboard,
  ClipboardCheck,
  Ellipsis,
  Pause,
  Play,
  Plus,
  RotateCcw,
} from "lucide-react";

import { useEffect, useState } from "react";
import "./App.css";

import Button from "./components/Button";

import { toast, ToastContainer } from "./lib/react-toastify";

function App() {
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(5);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  const reloadTimer = () => {
    setTimer(5);
    toast("You reset the timer");
  };

  useEffect(() => {
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
    <main className="bg-zinc-900 w-full h-[100vh] text-zinc-50 flex justify-center items-center">
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
          <Button>
            <Plus className="text-violet-400"></Plus>
          </Button>
        </div>

        <div className="w-[full] h-[18rem] grid gap-[1rem] overflow-y-scroll p-[2rem]">
          <div className="flex items-center text-zinc-400 justify-between bg-zinc-950 p-[1rem] rounded-md">
            <div className="flex gap-[1rem] items-center">
              <ClipboardCheck></ClipboardCheck>
              <p className="font-roboto  line-through font-light text-2xl">
                Create a new screen node
              </p>
            </div>

            <Button className="text-zinc-50">
              <Ellipsis></Ellipsis>
            </Button>
          </div>

          <div className="flex items-center justify-between bg-zinc-950 p-[1rem] rounded-md">
            <div className="flex gap-[1rem] items-center">
              <Button>
                <Clipboard></Clipboard>
              </Button>
              <p className="font-roboto  font-light text-2xl">
                Create a new screen node
              </p>
            </div>

            <Button>
              <Ellipsis></Ellipsis>
            </Button>
          </div>
          <div className="flex items-center justify-between bg-zinc-950 p-[1rem] rounded-md">
            <div className="flex gap-[1rem] items-center">
              <ClipboardCheck></ClipboardCheck>
              <p className="font-roboto  font-light text-2xl">
                Create a new screen node
              </p>
            </div>

            <Button>
              <Ellipsis></Ellipsis>
            </Button>
          </div>
        </div>
      </div>

      <ToastContainer theme="dark" />
    </main>
  );
}

export default App;
