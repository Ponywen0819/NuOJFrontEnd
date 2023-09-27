import { Navbar } from "@/components/navbar";
import { Header } from "@/components/header";
import { Box, Container } from "@/components/chakra";

const PaddingTop = ({ children }) => {
  return (
    <Box minHeight={"100vh"} backgroundColor={"gray.50"}>
      <Header bgColor="normal" />
      <Container as="main" maxW={"container.xl"} paddingX={4} paddingY={6}>
        {children}
      </Container>
    </Box>
  );
};

export default PaddingTop;
