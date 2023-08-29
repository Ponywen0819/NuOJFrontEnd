"use client";

import { Navbar } from "@/components/navbar";
import { RequireAuth } from "@/components/require";
import { auth_context } from "@/contexts/auth";
import { Box, Center, Text, Image, Container } from "@/components/chakra";
import { redirect } from "next/navigation";
import { useContext } from "react";
import useSWR from "swr";
import logo_min from "@/public/logo_min.png";

const fetcher = (...arg) =>
  fetch(...arg).then((res) => {
    if (!res.ok) {
      const error = new Error("error on fetching profile");
      error.message = "can't get profile";
      throw error;
    }

    return res.json();
  });

const RequireAdmin = (props) => {
  const { children } = props;
  const { user } = useContext(auth_context);
  const { handle } = user;
  const { data: profile } = useSWR(`/api/profile/${handle}`, fetcher);

  if (!profile) return "";

  const isAdmin = profile.role;

  if (!isAdmin) {
    redirect("/");
  }

  return children;
};

const Aside = () => {
  return (
    <Box
      as="aside"
      display={{ base: "none", lg: "block" }}
      w={"fit-content"}
      p={0}
    >
      <Center
        w={64}
        h={64}
        backgroundColor={"whiteAlpha.900"}
        borderRadius={"lg"}
        boxShadow={"sm"}
      >
        <Box>
          <Image
            alt="aside logo"
            width={"128px"}
            height={"128px"}
            src={logo_min.src}
          />
          <Text align={"center"}>NuOJ lab.</Text>
        </Box>
      </Center>
    </Box>
  );
};

const AdminLayout = ({ children }) => {
  return (
    <RequireAuth>
      <RequireAdmin>
        <Box backgroundColor={"gray.100"} minH={"100vh"}>
          <Box as="header" backgroundColor={"blackAlpha.900"}>
            <Navbar />
          </Box>
          <Container
            paddingX={3}
            paddingY={5}
            maxW={"container.xl"}
            display={"flex"}
            gap={3}
          >
            {children}
            <Aside />
          </Container>
        </Box>
      </RequireAdmin>
    </RequireAuth>
  );
};

export default AdminLayout;
