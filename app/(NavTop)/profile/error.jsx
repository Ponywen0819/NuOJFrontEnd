"use client";

const ProfileNotFound = ({ error, reset }) => {
  return (
    <div className="text-center mx-auto h-48 flex flex-col justify-center">
      <p className="p-2 w-fit mx-auto text-2xl font-mono bg-orange-400 rounded-lg">
        {"404 Not Found :("}
      </p>
    </div>
  );
};

export default ProfileNotFound;
