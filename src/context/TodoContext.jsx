import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

const initialTodos = [
  {
    id: 1,
    title: "tugas lab strukdat",
    description: "tugas linked list",
    status: "in progress",
    priority: "high",
    deadline: "2026-11-20",
  },
  {
    id: 2,
    title: "tugas lab pemweb",
    description: "kuis",
    status: "to-do",
    priority: "medium",
    deadline: "2026-11-22",
  },
  {
    id: 3,
    title: "tugas lab basdat",
    description: "",
    status: "done",
    priority: "low",
    deadline: "2026-11-25",
  },
];

export function TodoProvider({ children }) {
  const [data, setData] = useState(initialTodos);

  function addTodo(todo) {
    setData((prev) => [...prev, todo]);
  }

  function updateTodo(updatedTodo) {
    setData((prev) =>
      prev.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
  }

  function deleteTodo(id) {
    setData((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <TodoContext.Provider
      value={{ data, addTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}