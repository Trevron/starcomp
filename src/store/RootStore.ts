import PlanetStore from "./PlanetStore";
import SearchStore from "./SearchStore";

/**
 * This is the RootStore that is used in the RootStore/Provider pattern.
 */

class RootStore {
  planet: PlanetStore;
  search: SearchStore;

  constructor() {
    this.planet = new PlanetStore();
    this.search = new SearchStore();
  }
}

export default RootStore;
