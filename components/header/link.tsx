import NextLink from "next/link";
import { Box, Link } from "@/components/chakra";
type NavLinkProp = {
  href: string;
  label: string;
};

export const NavLink = ({ href, label }: NavLinkProp) => {
  return (
    <Box as="li" display={"block"}>
      <Link
        as={NextLink}
        href={href}
        borderBottomWidth={"2px"}
        borderColor={"rgba(0,0,0,0)"}
        color={"whiteAlpha.900"}
        fontWeight={"bold"}
        fontSize={"2xl"}
        textDecoration={"none"}
      >
        {label}
      </Link>
    </Box>
  );
};
