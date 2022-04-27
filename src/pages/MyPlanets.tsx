import React from "react";
import PlanetCard from "../components/PlanetCard";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useRootStore } from "../store/RootStoreProvider";

/**
 *  Observed list of saved planets
 *
 */

function MyPlanetsList() {
  const store = useRootStore();
  return (
    <div>
      {store.planet.planets.length === 0 ? (
        <h1 className="text-amber-400 font-bold text-xl flex justify-center self-center">
          Looking a little empty... Try adding some planets from a search!
        </h1>
      ) : (
        store.planet.planets.map((planet) => (
          // Regex replaces spaces with underscores
          <Link
            key={planet.id}
            to={`/planet/${planet.name.replace(/ /g, "_")}`}
            state={{ id: planet.id, from: "/myplanets" }}
          >
            <PlanetCard planet={planet} />
          </Link>
        ))
      )}
    </div>
  );
}

const MyPlanetsObserver = observer(MyPlanetsList);

function MyPlanets() {
  return (
    <>
      <h1 className="flex justify-center text-4xl font-bold text-gray-50 uppercase">
        My Planets
      </h1>
      <MyPlanetsObserver />
    </>
  );
}

export default MyPlanets;
