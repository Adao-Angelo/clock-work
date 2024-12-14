import React, { useEffect, useRef, useState } from "react";

interface DropdownRootProps {
  label?: React.ReactNode;
  children: React.ReactNode;
}

export const DropdownRoot: React.FC<DropdownRootProps> = ({
  children,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative text-left" ref={dropdownRef}>
      <button
        className={`inline-flex justify-center focus:outline-none ${
          isOpen ? "text-violet-400" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </button>

      {isOpen && (
        <div className="absolute right-0 w-56 origin-top-right z-10 rounded-md shadow-lg bg-zinc-50  dark:bg-zinc-950  ring-1 ring-zinc-50 ring-opacity-5 focus:outline-none">
          <div className="py-0">{children}</div>
        </div>
      )}
    </div>
  );
};

interface DropdownHeaderProps {
  children: React.ReactNode;
}

export const DropdownHeader: React.FC<DropdownHeaderProps> = ({ children }) => {
  return (
    <div className="px-4 py-3 text-2xl font-roboto border-b border-zinc-100 dark:border-zinc-900">
      {children}
    </div>
  );
};

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className="block px-4 py-2 text-[1.3rem] text-zinc-950  dark:text-zinc-50  z-0 hover:bg-zinc-100  dark:hover:bg-zinc-900  w-full text-left font-roboto"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
