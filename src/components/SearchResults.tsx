import React from "react";
import { request, gql } from "graphql-request";
import Card from "../components/Card";
import searchStore from "../store/SearchStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

function SearchResultsList() {
  return (
    <div className="">
      {searchStore.planets.map((planet) => (
        // Regex replaces spaces with underscores
        <Link to={`/planet/${planet.name.replace(/ /g,"_")}`}> 
          <Card key={planet.id} planet={planet} />
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