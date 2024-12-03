import { useState, useRef, useEffect } from "react";
import { IconButton } from "./IconButon";

interface ToDoProps {
  id: string;
  name: string;
  done: boolean;
  priority: string;
  deadline: string;
  handleDone: (id: string) => void;
  deleteToDo: (id: string) => void;
  editToDo: (id: string, name: string) => void;
}

export const ToDo = ({ id, name, done, priority, deadline, handleDone, deleteToDo, editToDo }: ToDoProps): JSX.Element => {
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Efecto para enfocar el input cuando isEditable cambia a true
  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  return (
    <li className="flex gap-2 px-2 py-4">
      <div className="flex gap-2 flex-col w-full">
        <div className="flex gap-2">
          <input type="checkbox" checked={done} onChange={() => handleDone(id)} />
          {isEditable ? (
            <input
              ref={inputRef}
              type="text"
              onBlur={() => setIsEditable(false)}
              defaultValue={name}
              onChange={(e) => editToDo(id, e.target.value)}
            />
          ) : (
            <span onClick={handleEditClick} className={`${done ? "line-through" : ""}`}>
              {name}
            </span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2.5 rounded-full
                ${priority === '1' ? "bg-red-600" : ""}
                ${priority === '2' ? "bg-yellow-600" : ""}
                ${priority === '3' ? "bg-green-600" : ""}
                ${priority === '4' ? "bg-blue-600" : ""}
                ${priority === '5' ? "bg-indigo-600" : ""}
                ${priority === '6' ? "bg-violet-600" : ""}
                ${priority === '7' ? "bg-fuchsia-600" : ""}
                ${priority === '8' ? "bg-pink-600" : ""}
                ${priority === '9' ? "bg-rose-600" : ""}
                ${priority === '10' ? "bg-amber-600" : ""}
                `}
            style={{ width: `${Number(priority) * 10}%` }}
          ></div>
        </div>
        <span className={`text-sm`}>{deadline}</span>
      </div>
      <IconButton type="button" onClick={() => deleteToDo(id)} iconDescription="Delete ToDo">
        {/* Trash Icon */}
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </IconButton>
    </li>
  );
};