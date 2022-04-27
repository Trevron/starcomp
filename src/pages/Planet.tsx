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

  const [loaded, setLoaded] = useState(false);
  const [planetSaved, setPlanetSaved] = useState(false);
  
  // Check if planet is already saved, if not Query the SWAPI
  useEffect(() => {
    if (planetStore.planetExists(location.state.id)) {
      searchStore.setSelectedPlanet(planetStore.getPlanet(location.state.id));
      setPlanetSaved(true);
      setLoaded(true);
    } else {
      request(
        "https://swapi-graphql.netlify.app/.netlify/functions/index",
        planetQuery
      ).then((data) => {
        searchStore.setSelectedPlanet(data.planet);
        setLoaded(true);
      })
      .catch(error => console.log("There was a problem requesting data.", error));
    }
  }, []);

  const handleSavePlanetClick = () => {
    // Can only delete if no updates are in progress.
    if (planetSaved && !showDescriptionForm && !showModal) {
      if (window.confirm("Are you sure you want to delete? \nAll edited information will be lost!")) {
        planetStore.deletePlanet(searchStore.getSelectedPlanet().id);
        setPlanetSaved(false);   
      }
    } else if (!planetSaved) {
      planetStore.addPlanet(searchStore.getSelectedPlanet());
      setPlanetSaved(true);
    }
  }
  
  // Input for description
  const [showDescriptionForm, setShowDescriptionForm] = useState(false);
  const descriptionFormHandler = () => {
    setShowDescriptionForm(!showDescriptionForm);
  }

  // Save description
  const saveDescription = (description: string) => {
    planetStore.setDescription(location.state.id, description);
  }

  // Modal for resident input
  const [showModal, setShowModal] = useState(false)
  const showModalHandler = () => {
    setShowModal(true);
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
            className={`${loaded ? "hidden" : "visible"} text-4xl font-bold text-amber-400 flex justify-center animate-ping`}
          >
            Loading
          </h1>
          <div id="planet-details" className={`${loaded ? "visible" : "hidden"} text-gray-50`}>
            <div className="flex mb-2 justify-between gap-x-1 flex-col md:flex-row">
              <h1 className="text-5xl text-amber-400 font-bold">
                {searchStore.getSelectedPlanet().name}
              </h1>
              <button 
                type="button"
                id="save-planet-button"
                onClick={handleSavePlanetClick} 
                className={`
                  ${planetSaved ? "bg-red-800" : "bg-emerald-800"} 
                  text-gray-50 w-24 min-w-[6rem] max-h-12 font-bold 
                  border border-amber-400 rounded hover:bg-amber-400 hover:text-white p-1`}
              >
                {planetSaved ? "Delete" : "Save"}
              </button>
              
            </div>
            <div>
              <div className="flex gap-1">
                <h2 className="text-amber-600 font-bold">Description</h2>
                <button  
                  className={`
                    ${planetSaved ? "visible" : "hidden"} 
                    text-xs text-amber-400 font-bold
                    min-w-fit w-30 max-h-12 p-1 border border-amber-400 rounded 
                    hover:bg-amber-400 hover:text-white 
                    `}
                  onClick={descriptionFormHandler}
                >
                {showDescriptionForm ? "Cancel" : "Edit"}
              </button>
              </div>
              <DescriptionInput 
                handleClose={descriptionFormHandler} 
                show={showDescriptionForm} 
                currentDescription={planetStore.getPlanet(location.state.id).description}
                handleSave={saveDescription}
              />
              <p className={showDescriptionForm ? "hidden" : "visible"}>
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
            <h2 className="text-amber-600 font-bold mb-1">Residents</h2>
                <ResidentsList planet={searchStore.getSelectedPlanet()} />
          </div>

          <div id="resident-add" className={planetSaved ? "visible" : "hidden"}>
            <InputModal show={showModal} handleClose={() => setShowModal(false)} planetID={location.state.id} handleSave={saveResident} />
            <button type="button" onClick={showModalHandler} className="text-amber-400 my-2 font-bold p-2 border border-amber-400 rounded hover:bg-amber-400 hover:text-gray-50">
              Add Resident
            </button>
          </div>

          </div>
          
        </div>
      </div>
    );
  } else {
    return (
      // Waiting for graphql request
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
