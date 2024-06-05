import React from "react";

import { UserButton } from "@clerk/nextjs";

const AppPage = () => {
  return (
    <>
      <UserButton />
      <div>AppPage</div>
    </>
  );
};

export default AppPage;
