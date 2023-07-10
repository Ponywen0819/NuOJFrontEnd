"use client";

import { createContext, useState } from "react";

export const navigate_context = createContext();

export const NavigateProvider = ({ children }) => {
  const [from, setLocation] = useState(null);

  const record = (Location) => {
    setLocation(Location);
  };

  const get = () => {
    setLocation(null);
    return from;
  };

  const context = { record, get };

  return (
    <navigate_context.Provider value={context}>
      {children}
    </navigate_context.Provider>
  );
};
