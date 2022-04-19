import React, { useEffect } from "react";
import { PlanetInterface } from "../store/PlanetStore";
import { request, gql } from "graphql-request";
import { useLocation, Location } from "react-router-dom";
import searchStore from "../store/SearchStore";
import { observer } from "mobx-react-lite";

type LocationProps = {
  state: {
    id: string;
    from: string;
  };
};

function PlanetDetails() {
  const location = useLocation() as LocationProps;

  const planetQuery = gql`
  query {
    planet(id: "${location.state.id}") {
      name
      id
      climates
      diameter
      terrains
    }
  }
  `;

  useEffect(() => {
    request(
      "https://swapi-graphql.netlify.app/.netlify/functions/index",
      planetQuery
    ).then((data) => {
      searchStore.setSelectedPlanet(data.planet);
      doneLoading();
    });
  }, []);

  function doneLoading() {
    const main = document.getElementById("planet-details");
    const loading = document.getElementById("loading");
    main?.classList.remove("hidden");
    loading?.classList.add("hidden");
  }

  return (
    <div className="mx-2">
      <h1
        id="loading"
        className="text-4xl font-bold text-amber-400 flex justify-center animate-ping"
      >
        Loading
      </h1>
      <div id="planet-details" className="hidden text-gray-50">
        <h1 className="text-5xl text-amber-400 font-bold">
          {searchStore.getSelectedPlanet().name}
        </h1>
        <div>
          <h2 className="text-amber-600 font-bold">Description</h2>
          <p>
            {searchStore.getSelectedPlanet().description || "No description."}
          </p>
        </div>
        <div>
          <h2 className="text-amber-600 font-bold">Diameter</h2>
          <p>{searchStore.getSelectedPlanet().diameter || "Unknown."}</p>
        </div>
        <div>
          <h2 className="text-amber-600 font-bold">Climates</h2>
          <ul>
            {searchStore.getSelectedPlanet().climates.map((climate) => (
              <li key={climate}>
                {climate.charAt(0).toUpperCase().concat(climate.slice(1))}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-amber-600 font-bold">Terrains</h2>
          <ul className="">
            {searchStore.getSelectedPlanet().terrains.map((terrain) => (
              <li>
                {terrain.charAt(0).toUpperCase().concat(terrain.slice(1))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const PlanetDetailsObserver = observer(PlanetDetails);

function Planet() {
  return <PlanetDetailsObserver />;
}

export default Planet;
