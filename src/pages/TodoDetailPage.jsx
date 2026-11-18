import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddTodoModal from "../components/AddTodoModal";
import { useTodos } from "../context/TodoContext";

export default function TodoDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, updateTodo } = useTodos();

  const [editModal, setEditModal] = useState(false);

  const todo = data.find((item) => item.id === Number(id));

  if (!todo) {
    return (
      <div className="h-screen flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl font-bold">Todo Tidak Ditemukan</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-4xl shadow p-8 grid grid-cols-3 gap-8 rounded-xl">
        <div className="flex flex-col gap-4 col-span-2">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">Judul</h1>
            <p>{todo.title}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">Deskripsi</h1>
            <div className="overflow-y-auto min-h-32 shadow p-3 rounded break-words">
              {todo.description || "Tidak ada deskripsi"}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div>
            <h1 className="font-bold text-2xl">Status</h1>
            <p>{todo.status}</p>
          </div>

          <div>
            <h1 className="font-bold text-2xl">Prioritas</h1>
            <p>{todo.priority}</p>
          </div>

          <div>
            <h1 className="font-bold text-2xl">Deadline</h1>
            <p>{todo.deadline}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigate("/")}
              className="bg-red-600 active:scale-90 transition-all hover:bg-red-800 text-white rounded py-2"
            >
              Kembali
            </button>

            <button
              onClick={() => setEditModal(true)}
              className="bg-blue-600 hover:bg-blue-800 active:scale-90 text-white rounded transition-all py-2"
            >
              Update
            </button>
          </div>
        </div>

        {editModal && (
          <AddTodoModal
            onClose={() => setEditModal(false)}
            onUpdate={updateTodo}
            description="Update Todo"
            todoData={todo}
          />
        )}
      </div>
    </div>
  );
}