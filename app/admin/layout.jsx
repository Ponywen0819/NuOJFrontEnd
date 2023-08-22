"use client";

import { Navbar } from "@/components/navbar";
import { auth_context, RequireAuth } from "@/contexts/auth";
import { Box, Container } from "@/components/chakra";
import { redirect } from "next/navigation";
import { useContext } from "react";
import useSWR from "swr";
import { HOST } from "@/setting";

const fetcher = (...arg) =>
  fetch(...arg).then((res) => {
    if (!res.ok) {
      const error = new Error("error on fetching profile");
      error.message = "can't get profile";
      throw error;
    }

    return res.json();
  });

const Context = (props) => {
  const { children } = props;
  const { user } = useContext(auth_context);
  const { handle } = user;
  const { data: profile } = useSWR(`${HOST}/api/profile/${handle}`, fetcher, {
    suspense: true,
  });
  const isAdmin = profile.role;

  if (!isAdmin) {
    redirect("/");
  }

  return children;
};

const AdminLayout = (props) => {
  return (
    <RequireAuth>
      <Box as="header" backgroundColor={"blackAlpha.900"}>
        <Navbar />
      </Box>
      <Container as="main" paddingX={3} paddingY={5} maxW={"container.xl"}>
        <Context {...props} />
      </Container>
    </RequireAuth>
  );
};

export default AdminLayout;
