import { Trash, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function TodoCard({
  id,
  judul,
  status,
  prioritas,
  deadline,
  onDelete,
}) {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  function handleDelete() {
    onDelete();
    setConfirm(false);
  }

  return (
    <div className="rounded shadow p-4 grid grid-cols-5 items-center">
      <h1 className="truncate w-52">{judul}</h1>
      <h1>{status}</h1>
      <h1>{prioritas}</h1>
      <h1>{deadline.split("T")[0]}</h1>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate(`/todo/${id}`)}
          className="bg-blue-600 w-10 flex justify-center rounded p-2 active:scale-90 transition-all duration-100 hover:bg-blue-800"
        >
          <Eye className="text-white" />
        </button>

        <button
          onClick={() => setConfirm(true)}
          className="bg-red-600 w-10 flex justify-center rounded p-2 active:scale-90 transition-all duration-100 hover:bg-red-800"
        >
          <Trash className="text-white" />
        </button>

        {confirm && (
          <ConfirmDeleteModal
            onClose={() => setConfirm(false)}
            onContinue={handleDelete}
            onLoading={false}
          />
        )}
      </div>
    </div>
  );
}