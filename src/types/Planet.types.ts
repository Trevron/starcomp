
export type AllPlanetsType = {
    planets: PlanetType[]
}

export type PlanetType = {
    name: string,
    id: string,
    climates: string[],
    terrains: string[],
    diameter: number
}