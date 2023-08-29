"use client";

import useSWR from "swr";
import { Spinner, Center } from "@/components/chakra";

const fetcher = (...arg) =>
  fetch(...arg).then((res) => {
    if (!res.ok) {
      throw new Error("error on fetching user information");
    }

    return res.json();
  });

const imgFetcher = (...arg) =>
  fetch(...arg)
    .then((res) => {
      if (!res.ok) {
        const error = new Error("error on fetching user information");
        error.message = "User Image Not Found";
        throw error;
      }
      return res.blob();
    })
    .then(
      (blob) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result;
            resolve(base64);
          };
          reader.readAsDataURL(blob);
        })
    );

const ProfileLayout = ({ children, params }) => {
  const handle = params.handle;
  const { data: profile, error } = useSWR(`/api/profile/${handle}`, fetcher);
  const { data: img } = useSWR(
    () => `/api/profile/${handle}/avatar`,
    imgFetcher
  );
  if (error) throw new Error("error on fetching user information");

  if (!profile || !img)
    return (
      <Center>
        <Spinner size={"xl"} />
      </Center>
    );
  return children;
};

export default ProfileLayout;
