import React, {createContext, ReactNode, useContext, useState} from 'react'
import RootStore from './RootStore';

type ProviderProps = {
    children: ReactNode;
}

// Create context
const StoreContext = createContext<RootStore | undefined>(undefined);

// Create the provider component
const RootStoreProvider = ({children}: ProviderProps) => {
    const [store, setStore] = useState(new RootStore())

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

export default RootStoreProvider;

// RootStore Hook
export const useRootStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useRootStore must be used within RootStoreProvider");
    }

    return context;
}

