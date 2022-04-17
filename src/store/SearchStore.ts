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

  public sortSearch = () => {
      const sortedPlanets = this.planets.sort((a, b) => (a.name > b.name) ? 1 : -1); 
      this.planets = sortedPlanets;
  }

}

const searchStore = new SearchStore();
export default searchStore;
