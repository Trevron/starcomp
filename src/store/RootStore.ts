import { makeAutoObservable } from "mobx";
import PlanetStore from "./PlanetStore";
import SearchStore from "./SearchStore";

// Implement root store/provider pattern

class RootStore {

  planet: PlanetStore;
  search: SearchStore;

    constructor() {
      //makeAutoObservable(this);
      this.planet = new PlanetStore;
      this.search = new SearchStore;
    }

}

export default RootStore;