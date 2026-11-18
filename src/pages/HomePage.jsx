import { useState } from "react";
import TodoCard from "../components/TodoCard";
import AddTodoModal from "../components/AddTodoModal";
import { Ghost } from "lucide-react";
import { useTodos } from "../context/TodoContext";

export default function HomePage() {
  const [todoModal, setTodoModal] = useState(false);

  const { data, addTodo, deleteTodo } = useTodos();

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-5xl font-bold">Todo List</h1>

        <button
          onClick={() => setTodoModal(true)}
          className="bg-blue-600 w-32 text-white flex justify-center rounded p-2 hover:bg-blue-800"
        >
          Tambah Todo
        </button>
      </div>

      {todoModal && (
        <AddTodoModal
          onClose={() => setTodoModal(false)}
          description="Tambah Todo"
          onUpdate={addTodo}
        />
      )}

      {data.length > 0 ? (
        <>
          <div className="grid grid-cols-5 px-4">
            <h1 className="text-xl font-bold">Judul</h1>
            <h1 className="text-xl font-bold">Status</h1>
            <h1 className="text-xl font-bold">Prioritas</h1>
            <h1 className="text-xl font-bold">Deadline</h1>
            <h1 className="text-xl text-center font-bold">Aksi</h1>
          </div>

          <div className="flex flex-col gap-3">
            {data.map((todo) => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                judul={todo.title}
                status={todo.status}
                prioritas={todo.priority}
                deadline={todo.deadline}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col gap-4 items-center">
            <Ghost size={60} className="animate-pulse" />
            <h1 className="text-2xl font-bold text-center">
              Belum ada Todo List
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}