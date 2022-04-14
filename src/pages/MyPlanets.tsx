import React from "react";
import { request, gql } from "graphql-request";
import Card from "../components/Card";
import planetStore from "../store/PlanetStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

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

function MyPlanetsList() {
  return (
    <div className="">
      {planetStore.planets.map((planet) => (
        <Link to={`/planet/${planet.name}`}>
        <Card
          key={planet.id}
          id={planet.id}
          name={planet.name}
          description={planet.description}
          climates={planet.climates}
          terrains={planet.terrains}
          diameter={planet.diameter}
          gravity={planet.gravity}
        />
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
