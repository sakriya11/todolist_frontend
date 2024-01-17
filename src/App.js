import "./App.css";
import Login from "./login/login";
import Register from "./register/register";
import Todolist from "./todo/todolist";
import UpdateList from "./components/update";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todo" element={<Todolist />} />
          <Route path="/update/:id" element={<UpdateList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
