import React, { useEffect, useState } from "react";
import planetStore, { PlanetInterface } from "../store/PlanetStore";
import { request, gql } from "graphql-request";
import { useLocation, Location } from "react-router-dom";
import searchStore from "../store/SearchStore";
import { observer } from "mobx-react-lite";
import InputModal from "../components/InputModal";
import ResidentsList from "../components/ResidentsList";
import { ResidentInterface } from "../model/Resident";
import DescriptionInput from "../components/DescriptionInput"

/*
    Planet details page.
    TODO:
      Styling.
      Disable delete while modal is open.
      Huge rework. Need to decouple a lot of things on this page.
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
      setCanAdd(true);
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
      setCanAdd(false);   
    } else {
      // Add planet to planet store
      planetStore.addPlanet(searchStore.getSelectedPlanet());
      setCanAdd(true);
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

  const [planetSaved, setPlanetSaved] = useState(false);

  // Div for the button to add residents
  const [canAdd, setCanAdd] = useState(false);
  const residentButtonClass = canAdd ? "visible" : "hidden";
  
  // Input for description
  const [showDescription, setShowDescription] = useState(false);
  const showDescriptionForm = () => {
    setShowDescription(true);
  }
  const hideDescriptionForm = () => {
    setShowDescription(false);
  }

  // Save description
  const saveDescription = (description: string) => {
    planetStore.getPlanet(location.state.id).description = description;
  }

  // Modal for resident input
  const [show, setShow] = useState(false)
  const showModal = () => {
    setShow(true);
  }
  const hideModal = () => {
    setShow(false);
  }

  // Save the person from the modal
  const saveResident = (resident: ResidentInterface) => {
    planetStore.addResident(location.state.id, resident);    
  }


  // Make sure planet object is working before render.
  if (searchStore.getSelectedPlanet().climates !== undefined) {
    return (
      <div className="w-full flex flex-wrap justify-center">
        <div className="px-2 lg:w-1/2 md:w-3/4 flex flex-col">
          <h1
            id="loading"
            className="text-4xl font-bold text-amber-400 flex justify-center animate-ping"
          >
            Loading
          </h1>
          <div id="planet-details" className="hidden text-gray-50">
            <div className="flex justify-between gap-x-1 flex-col md:flex-row">
              <h1 className="text-5xl text-amber-400 font-bold">
                {searchStore.getSelectedPlanet().name}
              </h1>
              <button 
                type="button"
                id="save-planet-button"
                onClick={handleSavePlanetClick} 
                className="text-gray-50 bg-emerald-800 w-24 min-w-[6rem] max-h-12 font-bold border border-amber-400 rounded hover:bg-amber-400 hover:text-white p-1"
              >
                Save Planet
              </button>
              
            </div>
            <div>
              <div className="flex gap-1">
                <h2 className="text-amber-600 font-bold">Description</h2>
                <button  
                  className={`
                    ${residentButtonClass} 
                    text-xs text-amber-400 font-bold
                    min-w-fit w-30 max-h-12 p-1 border border-amber-400 rounded 
                    hover:bg-amber-400 hover:text-white 
                    `}
                  onClick={showDescriptionForm}
                >
                Edit
              </button>
              </div>
              <DescriptionInput 
                handleClose={hideDescriptionForm} 
                show={showDescription} 
                currentDescription={searchStore.getSelectedPlanet().description}
                handleSave={saveDescription}
              />
              <p className={showDescription ? "hidden" : "visible"}>
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

          <div id="resident-cards">
            <h2 className="text-amber-600 font-bold">Residents</h2>
              <ResidentsList planet={searchStore.getSelectedPlanet()} />
          </div>

          <div id="resident-add" className={residentButtonClass}>
            <InputModal show={show} handleClose={hideModal} planetID={location.state.id} handleSave={saveResident} />
            <button type="button" onClick={showModal} className="text-amber-400 my-2 font-bold p-2 border border-amber-400 rounded hover:bg-amber-400 hover:text-gray-50">
              Add Resident
            </button>
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
