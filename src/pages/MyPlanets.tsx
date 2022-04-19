import React from "react";
import { request, gql } from "graphql-request";
import Card from "../components/Card";
import planetStore from "../store/PlanetStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

function MyPlanetsList() {
  return (
    <div className="">
      {planetStore.planets.map((planet) => (
        // Regex replaces spaces with underscores
        <Link key={planet.id} to={`/planet/${planet.name.replace(/ /g,"_")}`} state={{planetName: planet, from: "/myplanets"}}>
          <Card planet={planet} />
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
