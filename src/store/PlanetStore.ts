import { makeAutoObservable } from "mobx";
import { ResidentInterface } from "../model/Resident";
import { PlanetInterface } from "../model/Planet";

/**
 * This store holds the currently selected planet and the array of planets saved by the user.
 * There are several methods for interacting with the saved planets or selected planet.
 */

class PlanetStore {
  constructor() {
    makeAutoObservable(this);
  }

  public planets: PlanetInterface[] = [];

  private selectedPlanet = {} as PlanetInterface;

  public setSelectedPlanet = (currentPlanet: PlanetInterface) => {
    this.selectedPlanet = currentPlanet;
  };

  public getSelectedPlanet = () => {
    return this.selectedPlanet;
  };

  public planetExists(id: string) {
    return this.planets.some((planet) => planet.id === id);
  }

  public getPlanet(id: string): PlanetInterface {
    if (this.planets.find((planet) => planet.id === id)) {
      return this.planets.find((planet) => planet.id === id) as PlanetInterface;
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
  };

  public addResident = (id: string, resident: ResidentInterface) => {
    this.getPlanet(id).residentConnection.residents.push(resident);
  };

  public setDescription = (id: string, description: string) => {
    this.getPlanet(id).description = description;
  };
}

export default PlanetStore;
