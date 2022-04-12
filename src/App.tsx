import React, { ClassType } from 'react';

import './App.css';
import ComingSoon from './components/ComingSoon';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Card from './components/Card';


function App() {
  return (
    <Router>
    <div className="overflow-auto w-screen h-screen bg-gradient-to-t from-slate-900 to-gray-800">
      <Nav />
      
      <ComingSoon />
      
      <Card name='Planetland' description='this is a description'/>
      <Card name='Tatooine' description='Actual star wars planet'/>

    </div>

    </Router>
  );
}

export default App;
