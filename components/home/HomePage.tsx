import React from "react";

import { SignInButton } from "@clerk/nextjs";

const HomePage = () => {
  return (
    <>
      <SignInButton />
      <div>HomePage</div>
    </>
  );
};

export default HomePage;
