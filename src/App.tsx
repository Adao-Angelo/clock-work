import "@fontsource/roboto";
import {
  Clipboard,
  ClipboardCheck,
  Ellipsis,
  Play,
  Plus,
  RotateCcw,
} from "lucide-react";
import "./App.css";
import Button from "./components/Button";

function App() {
  return (
    <main className="bg-zinc-900 w-full h-[100vh] text-zinc-50 flex justify-center items-center">
      <div className="p-[2rem] w-[40rem]">
        <h1 className="font-roboto font-semibold text-9xl text-center ">
          20:00
        </h1>

        <div className="flex w-[30rem] m-auto justify-between my-[4rem] ">
          <Button>
            <RotateCcw></RotateCcw>
          </Button>
          <Button>
            <Play className=""></Play>
          </Button>
          <Button>
            <Plus></Plus>
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
    </main>
  );
}

export default App;
