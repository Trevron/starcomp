import React from "react";
import { request, gql } from "graphql-request";
import PlanetCard from "./PlanetCard";
import searchStore from "../store/SearchStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useRootStore } from "../store/RootStoreProvider";

/**
 *  Observable list of planets for the Search page and store
 * 
 */

function SearchResultsList() {
  const store = useRootStore();
  return (
    <div className="">
      {store.search.planets.map((planet) => (
        // Regex replaces spaces with underscores
        <Link key={planet.id} to={`/planet/${planet.name.replace(/ /g,"_")}`} state={{id: planet.id, from: "/search"}}> 
          <PlanetCard  planet={planet} />
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