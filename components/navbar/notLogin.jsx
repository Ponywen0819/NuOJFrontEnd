import { Flex, Box, Menu, MenuList, MenuDivider } from "@/components/chakra";
import { HamburgerButton } from "./button";
import { AuthOptions, PageOptions } from "./options";
import { NavLink } from "./link";

export const NotLoginInterface = () => {
  return (
    <>
      <Flex display={{ base: "none", lg: "flex" }} gap={10}>
        <NavLink href={"/auth/login"}>登入</NavLink>
        <NavLink href={"auth/registe"}>註冊</NavLink>
      </Flex>
      <Box display={{ base: "block", lg: "none" }}>
        <Menu>
          <HamburgerButton />
          <MenuList>
            <PageOptions />
            <MenuDivider />
            <AuthOptions />
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};
