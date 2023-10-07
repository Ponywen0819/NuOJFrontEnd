"use client";

import { InfoArea } from "./InfoArea";
import { SubmitArea } from "./submit";

const Main = ({ id, data }) => {
  return (
    <>
      <InfoArea data={data} id={id} />
      <SubmitArea id={id} />
    </>
  );
};

export default Main;
