"use client";

import { Box, Heading } from "@chakra-ui/react";

const ProblemError = ({ error, reset }) => {
  console.log(error);
  return (
    <Box>
      <Heading>{`404 :(`}</Heading>
    </Box>
  );
};

export default ProblemError;
