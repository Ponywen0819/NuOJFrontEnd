import NextLink from "next/link";
import logo_min from "@/public/logo_min.png";
import { Link, Image, Heading, Stack } from "@/components/chakra";

type HeaderProp = { label: string };

export const Header = ({ label }: HeaderProp) => {
  return (
    <Stack>
      <Link
        as={NextLink}
        href="/"
        display={"block"}
        width={"fit-content"}
        marginX={"auto"}
      >
        <Image src={logo_min.src} boxSize={24} />
      </Link>
      <Heading as={"h1"} textAlign={"center"} fontSize={"2xl"}>
        {label}
      </Heading>
    </Stack>
  );
};
