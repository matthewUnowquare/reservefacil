import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Login } from "./components/auth/Login";
import Home from "./components/Home/Home";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
