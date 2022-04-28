import { gql } from "graphql-request";

export const planetQuery = (id: string) => gql`
query {
  planet(id: "${id}") {
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

export const allPlanets = gql`
  query {
    allPlanets {
      planets {
        name
        id
        climates
        diameter
        terrains
      }
    }
  }
`;

