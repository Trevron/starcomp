import React, {useState, useEffect} from 'react'
import {request, gql} from 'graphql-request'
import { PlanetType, AllPlanetsType } from '../types/Planet.types'
import Card from './Card'

type Props = {}

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

function MyPlanets({}: Props) {

    const [state, setState] = useState({} as AllPlanetsType);
    //const list = state.planets.map(planet => <Card key={planet.id} name={planet.name} description={planet.id}/>)

    useEffect(() => {
      request('https://swapi-graphql.netlify.app/.netlify/functions/index', allPlanets)
      .then((data) => {
        setState(data.allPlanets);
      })
      .catch((e) => console.log('There was an error.', e))
    },);

  return (
    <div className="text-gray-50">
        <Card name="Test Planet" description="This is a big 'ol description. This actually doesn't say anything, but it is still words." />
        <Card name="Test Planet" description="This is a big 'ol description. This actually doesn't say anything, but it is still words." />
        <Card name="Test Planet" description="This is a big 'ol description. This actually doesn't say anything, but it is still words." />
        <Card name="Test Planet" description="This is a big 'ol description. This actually doesn't say anything, but it is still words." />
    </div>
  )
}

export default MyPlanets