import React from 'react';

import './App.css';
import ComingSoon from './pages/ComingSoon';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';


import Search from './pages/Search';
import MyPlanets from './pages/MyPlanets';




function App() {

  return (
    <div className="overflow-auto w-screen h-screen bg-gradient-to-t from-slate-900 to-gray-800">
      <Nav />
      <Routes>
        <Route path="/starcomp/" element={<ComingSoon />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/myplanets" element={<MyPlanets/>} />
      </Routes>
    </div>

  );
}

export default App;
