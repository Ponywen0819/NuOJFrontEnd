import { Box } from "@/components/chakra";

export const Header = ({ children }) => {
  return (
    <Box as="header" marginBottom={5}>
      {children}
    </Box>
  );
};
