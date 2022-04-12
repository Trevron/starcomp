import React, { ClassType } from 'react';

import './App.css';
import ComingSoon from './components/ComingSoon';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';


function App() {
  if (!new class { x: any }().hasOwnProperty('x')) throw new Error('Transpiler is not configured correctly');
  return (
    <Router>
    <div className="w-screen h-screen bg-gradient-to-t from-slate-900 to-gray-800">
      <Nav />
      <ComingSoon />
    </div>

    </Router>
  );
}

export default App;
