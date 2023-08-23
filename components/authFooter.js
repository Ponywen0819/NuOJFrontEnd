import { useContext } from "react";
import { color_context } from "@/contexts/color";
import { Text, Link } from "@/components/chakra";
import NextLink from "next/link";

export const Footer = ({ lable, href }) => {
  const color = useContext(color_context);
  return (
    <Text align={"center"}>
      尚未擁有帳號？
      <Link as={NextLink} href={href} color={`${color}.400`}>
        {lable}
      </Link>
    </Text>
  );
};
