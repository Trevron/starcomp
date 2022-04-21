import { makeAutoObservable } from "mobx";

// Implement root store/provider pattern

class Store {
    constructor() {
      makeAutoObservable(this);
    }

    
}

export default Store;