import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import ClientDashboard from "./components/ClientDashboard";
import Navigate from "./components/Navigate";
import Logout from "./components/Logout";

function App() {
  return (
    <>
      <Navigate />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<h1>Page Not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
