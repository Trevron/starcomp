import React, { useEffect } from 'react'
import { request, gql} from 'graphql-request';
import { PlanetType } from '../types/Planet.types'

const allPlanetsQuery = gql`
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
function getAllPlanets() {
    request('https://swapi-graphql.netlify.app/.netlify/functions/index', allPlanetsQuery)
    .then((data) => data)
    .catch((e)=> console.log('There was an error.', e))
}

export default function Planet({}: PlanetType) {

  return (
    getAllPlanets()
  )
}