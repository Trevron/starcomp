import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Search from "./pages/Search";
import MyPlanets from "./pages/MyPlanets";
import Planet from "./pages/Planet";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="overflow-auto w-screen h-screen bg-gradient-to-t from-slate-900 to-gray-800">
      <Nav />
      <Routes>
        <Route path="/starcomp/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/myplanets" element={<MyPlanets />} />
        <Route path="/planet/:planet" element={<Planet />} />
      </Routes>
    </div>
  );
}

export default App;
