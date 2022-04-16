import React from "react";
import { request, gql } from "graphql-request";
import Card from "../components/Card";
import planetStore from "../store/PlanetStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

function SearchResultsList() {
  return (
    <div className="">
      {planetStore.planetsSearch.map((planet) => (
        // Regex replaces spaces with underscores
        <Link to={`/planet/${planet.name.replace(/ /g,"_")}`}> 
          <Card key={planet.id} planet={planet} />
        </Link>
      ))}
    </div>
  );
}

const MyPlanetsObserver = observer(SearchResultsList);

function MyPlanets() {
  return (
    <>
      <MyPlanetsObserver />
    </>
  );
}

export default MyPlanets;