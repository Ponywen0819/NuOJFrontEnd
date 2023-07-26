"use client";

import { useEffect, useState } from "react";

async function initMocks() {
  const { worker } = await import("./browser");
  worker.start();
}

export const MockProvider = ({ children }) => {
  const [loaded, setLoad] = useState(false);

  useEffect(() => {
    initMocks().then(() => setLoad(true));
  }, []);

  return loaded ? children : "";
};
