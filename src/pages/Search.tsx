import React from 'react'
import { gql, request } from 'graphql-request';
import SearchForm from '../components/SearchForm';

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

  function onLoad() {

  }

  return (
    <div className="text-gray-50 flex justify-center content-center">
        <SearchForm />
    </div>
  )
}

export default Search