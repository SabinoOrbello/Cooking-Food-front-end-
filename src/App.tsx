import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Main from "./components/Main";
import IngredientGrid from "./components/IngredientGrid";
import Sidebar from "./components/SideBar";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.login);

  return (
    <Router>
      <div>
        <h1 className="text-center mt-3">
          Benvenuto in <span className="title">COOK & FOOD</span>
        </h1>
        {isAuthenticated && <Sidebar />}
        <Routes>
          {/* Rotte protette */}
          {isAuthenticated ? (
            <>
              <Route path="/main" element={<Main />} />
              <Route path="/ingredients" element={<IngredientGrid />} />
              <Route path="/" element={<Navigate to="/main" />} />
            </>
          ) : (
            // Rotte pubbliche
            <>
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/" element={<LoginForm />} />
            </>
          )}
          {/* Route non trovate */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
