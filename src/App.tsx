import React, { ClassType, useEffect, useState } from 'react';

import './App.css';
import ComingSoon from './components/ComingSoon';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Card from './components/Card';
import { request, gql} from 'graphql-request';
import { PlanetType, AllPlanetsType } from './types/Planet.types'


const allPlanets = gql`
 query {
    allPlanets {
      planets {
        name
        id
        climates
        diameter
        terrains
      }
    }
  }
`

function App() {

  const [state, setState] = useState({} as AllPlanetsType);

  useEffect(() => {
    request('https://swapi-graphql.netlify.app/.netlify/functions/index', allPlanets)
    .then((data) => {
      setState(data.allPlanets);
    })
    .catch((e) => console.log('There was an error.', e))
  },[]);

  


  const list = state.planets.map(planet => <Card key={planet.id} name={planet.name} description={planet.id}/>)

  return (
    
    <Router>
    <div className="overflow-auto w-screen h-screen bg-gradient-to-t from-slate-900 to-gray-800">
      <Nav />
      
      <ComingSoon />
      {
        list
      }

    </div>

    </Router>
  );
}

export default App;
