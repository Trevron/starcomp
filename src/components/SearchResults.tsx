import React from "react";
import { request, gql } from "graphql-request";
import Card from "../components/Card";
import searchStore from "../store/SearchStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

/**
 *  Observable list of planets for the Search page and store
 * 
 */

function SearchResultsList() {
  return (
    <div className="">
      {searchStore.planets.map((planet) => (
        // Regex replaces spaces with underscores
        <Link key={planet.id} to={`/planet/${planet.name.replace(/ /g,"_")}`} state={{id: planet.id, from: "/search"}}> 
          <Card  planet={planet} />
        </Link>
      ))}
    </div>
  );
}

const SearchPlanetObserver = observer(SearchResultsList);

function SearchResults() {
  return (
    <>
      <SearchPlanetObserver />
    </>
  );
}

export default SearchResults;