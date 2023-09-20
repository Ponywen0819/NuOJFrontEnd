import { Container } from "@/components/chakra";

export const AboutContainer = ({ children }) => {
  return (
    <Container
      rounded={"lg"}
      bgColor={"white"}
      boxShadow={"sm"}
      padding={3}
      minW={"container.lg"}
      w={"full"}
    >
      {children}
    </Container>
  );
};
