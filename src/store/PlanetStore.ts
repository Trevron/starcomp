export interface PlanetInterface {
    id: string;
    name: string;
    description: string;
}

export class PlanetStore {

    public planets: PlanetInterface[] = [
        {id: "1asdas", name: "Tattooine", description: "This is a planet."},
        {id: "2afdsj", name: "Naboo", description: "This is a planet as well."},
        {id: "3fdasf", name: "Alderan", description: "This is a planet also."}
    ];

    public addPlanet = (planet: PlanetInterface) => {
        this.planets.push(planet);
        console.log("New planet added");
    };

    public updatePlanet = (updatedPlanet: PlanetInterface) => {
        const updatedPlanets = this.planets.map(planet => {
            if (planet.id === updatedPlanet.id) {
                return {...updatedPlanet};
            }
            return planet;
        });
        this.planets = updatedPlanets;
    };

    public deletePlanet = (id: string) => {
        const updatedPlanets = this.planets.filter(planet => planet.id !== id);
        this.planets = updatedPlanets;
        console.log("Planet deleted.");
    };
    
}