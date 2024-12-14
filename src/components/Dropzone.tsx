import React, { useState } from "react";
import Modal from "react-modal";

interface DropzoneProps {
  workTime: number;
  breakTime: number;
  setWorkTime: (time: number) => void;
  setBreakTime: (time: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Dropzone: React.FC<DropzoneProps> = ({
  workTime,
  breakTime,
  setWorkTime,
  setBreakTime,
  isOpen,
  onClose,
}) => {
  const [tempWorkTime, setTempWorkTime] = useState(workTime);
  const [tempBreakTime, setTempBreakTime] = useState(breakTime);

  const handleSave = () => {
    setWorkTime(tempWorkTime);
    setBreakTime(tempBreakTime);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-[30rem] bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
    >
      <h2 className="text-2xl mb-4">Customize Pomodoro Timer</h2>
      <div className="flex flex-col gap-4">
        <label>
          Work Time (minutes):
          <input
            type="number"
            min={1}
            value={tempWorkTime}
            onChange={(e) => setTempWorkTime(Number(e.target.value))}
            className="w-full bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md"
          />
        </label>
        <label>
          Break Time (minutes):
          <input
            type="number"
            min={1}
            value={tempBreakTime}
            onChange={(e) => setTempBreakTime(Number(e.target.value))}
            className="w-full bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md"
          />
        </label>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="w-full bg-zinc-400 text-zinc-50 p-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-full bg-violet-600 text-zinc-50 p-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Dropzone;
