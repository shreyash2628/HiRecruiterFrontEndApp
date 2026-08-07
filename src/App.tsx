import { useState } from "react";

import Login from "./Component/Login";
import Signup from "./Component/SignUp";
import Dashboard from "./Component/Dashboard";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "login" | "signup" | "dashboard"
  >("login");

  return (
    <div className="App">
      {currentPage === "login" && (
        <Login
          onLoginSuccess={() => setCurrentPage("dashboard")}
          onSignup={() => setCurrentPage("signup")}
        />
      )}

      {currentPage === "signup" && (
        <Signup
          onLogin={() => setCurrentPage("login")}
        />
      )}

      {currentPage === "dashboard" && (
        <Dashboard />
      )}
    </div>
  );
}

export default App;