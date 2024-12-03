import { useEffect, useState } from "react";
import { ToDo } from "../interfaces/ToDos";
import { setDateTime } from "../utils/utils";
import { useLocalStorage } from "./useStorage";

const toDoInitialState: ToDo = {
  id: "",
  name: "",
  done: false,
  priority: '0',
  deadline: setDateTime(new Date())
};

export function useToDos() {
  const [toDosLS, setToDosLS,
    // removeToDosLS
  ] = useLocalStorage("toDos", []);
  const [toDos, setToDos] = useState<ToDo[]>(toDosLS || []);
  const [toDo, setToDo] = useState(toDoInitialState);

  // Actualizar toDos cuando toDosLS cambie
  useEffect(() => {
    setToDos(toDosLS || []);
  }, [toDosLS]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setToDo({
      ...toDo,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (toDo.name.length < 3) return alert("Name must be at least 3 characters long");

    const newToDo = {
      id: self.crypto.randomUUID(),
      name: toDo.name,
      done: false,
      priority: toDo.priority,
      deadline: toDo.deadline
    };

    setToDos(prev => [...prev, newToDo]);
    setToDosLS((prev) => [...prev, newToDo]); // Actualizar localStorage
    setToDo(toDoInitialState);
  };

  const handleDone = (id: string): void => {
    setToDos(prev =>
      prev.map(toDo => toDo.id === id ? { ...toDo, done: !toDo.done } : toDo)
    );
    // Sincronizar con localStorage
    setToDosLS((prev) =>
      prev.map(toDo => toDo.id === id ? { ...toDo, done: !toDo.done } : toDo)
    );
  };

  const deleteToDo = (id: string): void => {
    setToDos(prev => prev.filter(toDo => toDo.id !== id));
    // Sincronizar con localStorage
    setToDosLS((prev) => prev.filter(toDo => toDo.id !== id));
  };

  const editToDo = (id: string, name: string): void => {
    setToDos(prev =>
      prev.map(toDo => toDo.id === id ? { ...toDo, name } : toDo)
    );
    // Sincronizar con localStorage
    setToDosLS((prev) =>
      prev.map(toDo => toDo.id === id ? { ...toDo, name } : toDo)
    );
  };

  return {
    toDos,
    toDo,
    handleChange,
    handleSubmit,
    handleDone,
    deleteToDo,
    editToDo
  };
}