"use client";

import { createContext } from "react";

export const color_context = createContext();

export const ColorProvider = ({ children }) => {
  let colorArray = ["blue", "orange", "purple", "red"];
  const color = colorArray[Math.floor(Math.random() * 4)];

  return (
    <color_context.Provider value={color}>{children}</color_context.Provider>
  );
};
