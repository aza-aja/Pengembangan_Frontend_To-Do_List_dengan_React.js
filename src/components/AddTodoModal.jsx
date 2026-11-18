import { useState } from "react";

export default function AddTodoModal({
  onClose,
  onUpdate,
  description,
  todoData,
}) {
  const [error, setError] = useState("");

  const [data, setData] = useState({
    title: todoData?.title || "",
    description: todoData?.description || "",
    status: todoData?.status || "to-do",
    priority: todoData?.priority || "low",
    deadline: todoData?.deadline?.split("T")[0] || "",
  });

  function handleChange(e) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!data.title.trim() || !data.deadline) {
      return setError("Judul dan deadline wajib diisi!");
    }

    const isUpdate = Boolean(todoData?.id);

    if (isUpdate) {
      onUpdate({
        ...todoData,
        ...data,
      });
    } else {
      onUpdate({
        ...data,
        id: Date.now(),
      });
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col gap-4 py-6 px-8 w-full max-w-lg rounded-xl shadow-xl max-h-[90vh] overflow-y-auto"
      >
        <h1 className="text-2xl font-semibold text-center">
          {description}
        </h1>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold">Judul</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Masukkan judul tugas"
            className="shadow p-2 border border-blue-600 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold">
            Deskripsi (Opsional)
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Masukkan deskripsi tugas..."
            className="shadow p-2 border border-blue-600 rounded"
            rows="3"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Status</label>
            <select
              name="status"
              value={data.status}
              onChange={handleChange}
              className="border border-blue-600 rounded p-2"
            >
              <option value="to-do">to-do</option>
              <option value="in progress">in progress</option>
              <option value="done">done</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Prioritas</label>
            <select
              name="priority"
              value={data.priority}
              onChange={handleChange}
              className="border border-blue-600 rounded p-2"
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={data.deadline}
            onChange={handleChange}
            className="shadow p-2 border border-blue-600 rounded"
          />
        </div>

        {error && (
          <p className="text-red-600 font-bold text-center">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-600 hover:bg-red-800 text-white rounded py-2"
          >
            Batal
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white rounded py-2"
          >
            {todoData ? "Update" : "Tambah"}
          </button>
        </div>
      </form>
    </div>
  );
}