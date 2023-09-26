import GoogleImg from "@/public/google_icon.png";
import NextImage from "next/image";
import { Image, Box } from "@/components/chakra";

export const GoogleIcon = () => {
  return <Box as={NextImage} src={GoogleImg} w={6} h={6} />;
};
