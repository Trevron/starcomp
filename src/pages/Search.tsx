import React, { useEffect, useState } from 'react'
import { gql, request } from 'graphql-request';
import SearchForm from '../components/SearchForm';
import planetStore from '../store/PlanetStore';
import Card from '../components/Card';

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
  `;


function Search() { 

  useEffect(() =>{
    request('https://swapi-graphql.netlify.app/.netlify/functions/index', allPlanets).then(data => planetStore.setPlanetSearch(data.allPlanets.planets));
  }, []);

  return (
    <div className="flex flex-col ">
      <div className="text-gray-50 flex content-center align-center justify-center content-center">
          <SearchForm />
      </div>
      <div>
            {
              planetStore.planetsSearch.map(planet => <Card key={planet.id} planet={planet}/>)
            }
          </div>
    </div>
  )
}

export default Search