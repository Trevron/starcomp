import { makeAutoObservable } from "mobx";
import { PlanetInterface } from "./PlanetStore";

class SearchStore {
  constructor() {
    makeAutoObservable(this);
  }

  public planets: PlanetInterface[] = [];

  public setPlanets = (newPlanets: PlanetInterface[]) => {
    this.planets = newPlanets;
  }

  public filterSearch = () => {
    this.planets = this.planets.filter(planet => planet.climates.includes('temperate'));
  }

}

const searchStore = new SearchStore();
export default searchStore;
