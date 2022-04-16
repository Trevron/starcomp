import { makeAutoObservable } from "mobx";
import { PersonInterface } from "./PeopleStore";

export interface PlanetInterface {
  id: string;
  name: string;
  climates: string[];
  diameter: number;
  terrains: string[];
  description?: string;
  people?: PersonInterface[];
  population?: number;
  gravity?: string;
  saved?: boolean;
}

class PlanetStore {
  constructor() {
    makeAutoObservable(this);
  }

  public planets: PlanetInterface[] = [
    {
      id: "1231a",
      name: "Dantooine",
      climates: ["Wet", "Wetter"],
      diameter: 10,
      terrains: ["Big", "Small"],
      description: "This is a description",
      people: [
        {
          name: "Boblawblaw",
          gender: "Male",
          height: 10,
          born: "200",
          planetID: "1231a",
          id: "12s",
        },
      ],
      population: 1058564,
      gravity: "A lot.",
      saved: true,
    },
    {
      id: "1sdfsa",
      name: "Alderan",
      climates: ["Cold", "Hot"],
      diameter: 10,
      terrains: ["Wooded", "Barren"],
      people: [
        {
          name: "Boblawblaw",
          gender: "Male",
          height: 10,
          born: "200",
          planetID: "1sdfsa",
          id: "10a",
        },
      ],
      population: 1058564,
      gravity: "A lot.",
      saved: true,
    },
  ];

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
}

const planetStore = new PlanetStore();
export default planetStore;
