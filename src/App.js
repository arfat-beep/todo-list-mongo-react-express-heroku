import { Route, Routes } from "react-router";
import Header from "./Todo/Header/Header";
import Login from "./Todo/Login/Login";
import RequireAuth from "./Todo/Shared/RequireAuth";
import SignUp from "./Todo/signup/SignUp";
import Todo from "./Todo/Todo";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Todo />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
