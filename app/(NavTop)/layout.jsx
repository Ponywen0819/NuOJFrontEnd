import { Navbar } from "@/components/navbar";
import { Box, Container } from "@/components/chakra";

const PaddingTop = ({ children }) => {
  return (
    <>
      <Box as="header" w={"100%"} backgroundColor={"blackAlpha.900"}>
        <Navbar />
      </Box>
      <Container as="main" maxW={"container.xl"} paddingX={4} paddingY={6}>
        {children}
      </Container>
    </>
  );
};

export default PaddingTop;
