import { ToDo } from "./components/ToDo"
import { Button } from "./components/Button"
import { useToDos } from "./hooks/useToDos"
import { setDateTime } from "./utils/utils"
import { useEffect } from "react"
import { toast } from "sonner"

function App() {
  const {
    toDos,
    toDo,
    handleChange,
    handleSubmit,
    handleDone,
    deleteToDo,
    editToDo
  } = useToDos()

  // Comprobar si las tareas están por vencer
  useEffect(() => {
    const checkDeadlines = () => {
      const now = new Date();

      toDos.forEach((toDo) => {
        const deadline = new Date(toDo.deadline);
        if (deadline < now) {
          toast.message("Attention!", {
            description: `The task “${toDo.name}” is about to expire.`,
          })
        }
      });
    };

    // Intervalo para verificar cada minuto
    const ONE_MINUTE_IN_MILISECONDS = 60000;
    const intervalId = setInterval(checkDeadlines, ONE_MINUTE_IN_MILISECONDS);

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
  }, [toDos]);

  return (
    <section className="flex flex-col gap-2 max-w-sm mx-auto my-8">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            ToDo Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={toDo.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="My ToDo"
            required
          />
          <label
            htmlFor="deadline"
            className="block mb-2 mt-4 text-sm font-medium text-gray-900"
          >
            Deadline
          </label>
          <input type="datetime-local" id="deadline" name="deadline" value={toDo.deadline} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={setDateTime(new Date())} />
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            name="priority"
            value={toDo.priority}
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
          />
          <span className="text-sm font-medium text-gray-900">({toDo.priority})</span>
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
        >
          Add
        </Button>
      </form>
      {toDos && <ul className="flex flex-col divide-y">
        {toDos.map(({ id, name, priority, done, deadline }) => (
          <ToDo
            key={id}
            id={id}
            name={name}
            done={done}
            deadline={deadline}
            priority={priority}
            handleDone={handleDone}
            deleteToDo={deleteToDo}
            editToDo={editToDo}
          />
        ))}
      </ul >}
      {toDos.length === 0 && <p className="text-center">No ToDos</p>}
    </section>
  )
}

export default App
