import React, { useEffect } from "react";
import planetStore, { PlanetInterface } from "../store/PlanetStore";
import { request, gql } from "graphql-request";
import { useLocation, Location } from "react-router-dom";
import searchStore from "../store/SearchStore";
import { observer } from "mobx-react-lite";

/*
    Planet details page.
    TODO:
      Add place for resident cards.
      Add button for adding a resident.
      Make modal and resident cards.
      Styling.
*/

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
      residentConnection{
        residents {
          name
          gender
          height
          birthYear      
        }
      }
    }
  }
  `;
  // Check if planet is already saved, if not Query the SWAPI
  useEffect(() => {
    if (planetStore.planetExists(location.state.id)) {
      searchStore.setSelectedPlanet(planetStore.getPlanet(location.state.id));
      doneLoading();
    } else {
      request(
        "https://swapi-graphql.netlify.app/.netlify/functions/index",
        planetQuery
      ).then((data) => {
        searchStore.setSelectedPlanet(data.planet);
        doneLoading();
      })
      .catch(error => console.log("There was a problem requesting data.", error));
    }
  }, []);

  function doneLoading() {
    toggleSaveButton();
    const main = document.getElementById("planet-details");
    const loading = document.getElementById("loading");
    main?.classList.remove("hidden");
    loading?.classList.add("hidden");
  }

  const handleSavePlanetClick = () => {
    // const savePlanetButton = document.getElementById("save-planet-button");
    if (planetStore.planetExists(searchStore.getSelectedPlanet().id)) {
      // Remove planet from planet store
      planetStore.deletePlanet(searchStore.getSelectedPlanet().id);   
    } else {
      // Add planet to planet store
      planetStore.addPlanet(searchStore.getSelectedPlanet());
    }
    toggleSaveButton();
  }

  function toggleSaveButton() {
    const savePlanetButton = document.getElementById("save-planet-button");
    if (savePlanetButton !== null) {
      if (planetStore.planetExists(searchStore.getSelectedPlanet().id)) {
        savePlanetButton.classList.add("bg-red-800");
        savePlanetButton.classList.remove("bg-emerald-800");
        savePlanetButton.textContent = "Delete";
      } else {
        savePlanetButton.classList.add("bg-emerald-800");
        savePlanetButton.classList.remove("bg-red-800");
        savePlanetButton.textContent = "Save";
      }
    }
  }

  // Make sure planet object is working before render.
  if (searchStore.getSelectedPlanet().climates !== undefined) {
    return (
      <div className="w-full flex flex-wrap justify-center">
        <div className="px-2 w-1/2 flex flex-col">
          <h1
            id="loading"
            className="text-4xl font-bold text-amber-400 flex justify-center animate-ping"
          >
            Loading
          </h1>
          <div id="planet-details" className="hidden text-gray-50">
            <div className="flex justify-between">
              <h1 className="text-5xl text-amber-400 font-bold">
                {searchStore.getSelectedPlanet().name}
              </h1>
              <button 
                type="button"
                id="save-planet-button"
                onClick={handleSavePlanetClick} 
                className="text-gray-50 bg-emerald-800 w-24 font-bold border border-amber-400 rounded hover:bg-amber-400 hover:text-white p-1"
              >
                Save Planet
              </button>
              
            </div>
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
                  <li key={terrain}>
                    {terrain.charAt(0).toUpperCase().concat(terrain.slice(1))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <h1 className="text-4xl font-bold text-amber-400 flex justify-center animate-ping">
        Loading
      </h1>
    )
  }
}

const PlanetDetailsObserver = observer(PlanetDetails);

function Planet() {
  return <PlanetDetailsObserver />;
}

export default Planet;
