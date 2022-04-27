import React, {createContext, ReactNode, useContext} from 'react'
import RootStore from './RootStore';

type ProviderProps = {
    children: ReactNode;
}

// Singleton reference to the root store
let store: RootStore;

// Create context
const StoreContext = createContext<RootStore | undefined>(undefined);

// Create the provider component
const RootStoreProvider = ({children}: ProviderProps) => {

    // Only create the store once
    const root = store ?? new RootStore();

  return (
    <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
  )
}

export default RootStoreProvider;

// Create the hook
export const useRootStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useRootStore must be used within RootStoreProvider");
    }

    return context;
}

