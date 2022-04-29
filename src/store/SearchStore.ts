import { makeAutoObservable } from "mobx";
import { PlanetInterface } from "../model/Planet";

/**
 * This store holds the array of planets from queried search results.
 * There are several methods used to sort and filter search results.
 */

class SearchStore {
  constructor() {
    makeAutoObservable(this);
  }

  public planets: PlanetInterface[] = [];

  public setPlanets = (newPlanets: PlanetInterface[]) => {
    this.planets = newPlanets;
  };

  public filterSearch = (climates: []) => {
    const filtered = this.planets.filter((planet) =>
      climates.some((climate) => planet.climates.includes(climate))
    );
    this.planets = filtered;
  };

  public searchInput = (input: string) => {
    const filtered = this.planets.filter((planet) =>
      planet.name.toLowerCase().includes(input)
    );
    this.planets = filtered;
  };

  public sortSearch = (sortBy: string) => {
    switch (sortBy) {
      case "default":
        this.planets = this.planets.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;

      case "reverse":
        this.planets = this.planets.sort((a, b) => (a.name < b.name ? 1 : -1));
        break;

      case "size":
        this.planets = this.planets.sort((a, b) =>
          a.diameter > b.diameter ? 1 : -1
        );
        break;

      case "size-desc":
        this.planets = this.planets.sort((a, b) =>
          a.diameter < b.diameter ? 1 : -1
        );
        break;
    }
  };
}

export default SearchStore;
