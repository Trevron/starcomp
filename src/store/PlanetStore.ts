import { makeAutoObservable } from "mobx";
import { ResidentInterface } from "../model/Resident";

/**
 * This contains the Planet data model as well as the planet store.
 * TODO:
 *  Restructure the Stores and clean up the data model.
 */

export interface PlanetInterface {
  id: string;
  name: string;
  climates: string[];
  diameter: number;
  terrains: string[];
  description?: string;
  residentConnection: ResidentConnection;
  population?: number;
  gravity?: string;
  saved?: boolean;
}

interface ResidentConnection {
  residents: ResidentInterface[];
}

type PlanetProps = {
  planet: PlanetInterface;
}

class PlanetStore {
  constructor() {
    makeAutoObservable(this);
  }

  public planets: PlanetInterface[] = [];

  public planetExists(id: string) {
    return (this.planets.some(planet => planet.id === id));
  }
  
  public getPlanet(id: string): PlanetInterface {
    if (this.planets.find(planet => planet.id === id)) {
      return this.planets.find(planet => planet.id === id) as PlanetInterface;
    }
    return {} as PlanetInterface;
  }

  public addPlanet = (planet: PlanetInterface) => {
    this.planets.push(planet);
  };

  public updatePlanet = (updatedPlanet: PlanetInterface) => {
    const updatedPlanets = this.planets.map((planet) => {
      if (planet.id === updatedPlanet.id) {
        return { ...updatedPlanet };
      }
      return planet;
    });
    this.planets = updatedPlanets;
  };

  public deletePlanet = (id: string) => {
    const updatedPlanets = this.planets.filter((planet) => planet.id !== id);
    this.planets = updatedPlanets;
  };

  public setResidents = (id: string, residents: ResidentInterface[]) => {
    this.getPlanet(id).residentConnection.residents = residents;
  }

  public addResident = (id: string, resident: ResidentInterface) => {
    this.getPlanet(id).residentConnection.residents.push(resident);
  }

  public setDescription = (id: string, description: string) => {
    this.getPlanet(id).description = description;
  }

}

const planetStore = new PlanetStore();
export default planetStore;
