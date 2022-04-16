import React, { useEffect, useState } from 'react'
import { gql, request } from 'graphql-request';
import SearchForm from '../components/SearchForm';
import planetStore from '../store/PlanetStore';
import Card from '../components/Card';
import SearchResults from '../components/SearchResults';

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
  let loaded = false;
  useEffect(() =>{
    if (!loaded) {
      request('https://swapi-graphql.netlify.app/.netlify/functions/index', allPlanets).then(data => planetStore.setPlanetSearch(data.allPlanets.planets));
      loaded = true;
    }
  }, []);


  return (
    <div className="flex flex-col ">
      <button onClick={planetStore.filterSearch}>Filter</button>
      <div className="text-gray-50 flex content-center align-center justify-center content-center">
          <SearchForm />
      </div>
      <div>
          <SearchResults />
      </div>
    </div>
  )
}

export default Search