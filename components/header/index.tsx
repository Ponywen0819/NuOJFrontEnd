import { Box, Container, Link, Image } from "@/components/chakra";
import NextLink from "next/link";

import logo from "@/public/logo-white.svg";

import { Nav } from "./nav";
import { Auth } from "./auth";

type HeaderProp = {
  full: boolean;
  bgColor: "none" | "normal";
};

const Logo = () => (
  <Link as={NextLink} href="/">
    <Image alt="logo" height={12} src={logo.src} />
  </Link>
);

export const Header = (prop: HeaderProp) => {
  return (
    <Box
      as="header"
      w={"100vw"}
      backgroundColor={prop.bgColor === "normal" ? "gray.700" : ""}
    >
      <Container
        maxW={prop.full ? "" : "container.xl"}
        display={"flex"}
        alignItems={"center"}
        paddingY={5}
        gap={10}
      >
        <Logo />
        <Nav />
        <Box marginLeft={"auto"}>
          <Auth />
        </Box>
      </Container>
    </Box>
  );
};
