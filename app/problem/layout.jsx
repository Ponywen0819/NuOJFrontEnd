import { Box, Stack } from "@/components/chakra";
import { Navbar } from "@/components/navbar";

const ProblemLayout = (props) => {
  const { children } = props;
  return (
    <Stack minH={"lg"} height={"100vh"} gap={0} background={"gray.100"}>
      <Box as="header" backgroundColor={"black"}>
        <Navbar />
      </Box>
      {children}
    </Stack>
  );
};

export default ProblemLayout;
