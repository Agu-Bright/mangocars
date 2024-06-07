import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
