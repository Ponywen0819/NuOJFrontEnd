import { MenuButton, IconButton, HamburgerIcon } from "@/components/chakra";

export const HamburgerButton = () => (
  <MenuButton
    as={IconButton}
    icon={<HamburgerIcon />}
    rounded={"lg"}
    variant="outline"
    aria-label="Options"
    colorScheme="whiteAlpha"
  />
);
