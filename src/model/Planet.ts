import { ResidentConnection } from "./Resident";

/**
 * Interface for planet objects and for interacting with the GraphQL Star Wars API.
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
