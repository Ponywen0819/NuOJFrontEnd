import { useContext } from "react";
import { color_context } from "@/contexts/color";
import { Text, Link } from "@/components/chakra";
import NextLink from "next/link";

type FooterProp = { label: string, href: string}

export const Footer = ({ label, href }:FooterProp) => {
  const color = useContext(color_context);
  return (
    <Text align={"center"}>
      尚未擁有帳號？
      <Link as={NextLink} href={href} color={`${color}.400`}>
        {label}
      </Link>
    </Text>
  );
};
