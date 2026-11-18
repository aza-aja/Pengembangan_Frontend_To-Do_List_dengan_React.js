import { BrowserRouter, Routes, Route } from "react-router-dom";

import TodoDetailPage from "./pages/TodoDetailPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { TodoProvider } from "./context/TodoContext.jsx";

function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo/:id" element={<TodoDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}

export default App;
