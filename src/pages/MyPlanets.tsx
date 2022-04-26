import React from "react";
import { request, gql } from "graphql-request";
import PlanetCard from "../components/PlanetCard";
import planetStore from "../store/PlanetStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

/**
 *  Observed list of saved planets
 * 
 */

function MyPlanetsList() {
  return (
    <div>
      {planetStore.planets.map((planet) => (
        // Regex replaces spaces with underscores
        <Link key={planet.id} to={`/planet/${planet.name.replace(/ /g,"_")}`} state={{id: planet.id, from: "/myplanets"}}>
          <PlanetCard planet={planet} />
        </Link>
      ))}
    </div>
  );
}

const MyPlanetsObserver = observer(MyPlanetsList);

function MyPlanets() {
  return (
    <>
      <h1 className="flex justify-center text-5xl text-gray-50">My Planets</h1>
      <MyPlanetsObserver />
    </>
  );
}

export default MyPlanets;
