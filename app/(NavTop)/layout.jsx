import { Navbar } from "@/components/navbar";
import { Box, Container } from "@/components/chakra";

const PaddingTop = ({ children }) => {
  return (
    <Box minHeight={"100vh"} backgroundColor={"gray.50"}>
      <Box as="header" w={"100%"} backgroundColor={"gray.700"}>
        <Navbar />
      </Box>
      <Container as="main" maxW={"container.xl"} paddingX={4} paddingY={6}>
        {children}
      </Container>
    </Box>
  );
};

export default PaddingTop;
