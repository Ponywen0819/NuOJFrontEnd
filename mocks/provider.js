"use client";

import { useEffect, useLayoutEffect, useState } from "react";

async function initMocks() {
  const { worker } = await import("./browser");
  worker.start();
}

export const MockProvider = ({ children }) => {
  const [loaded, setLoad] = useState(false);
  const enable = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

  useEffect(() => {
    if (enable) {
      initMocks().then(() => setLoad(true));
    }
  }, []);

  return !enable || loaded ? children : "";
};

export {};
