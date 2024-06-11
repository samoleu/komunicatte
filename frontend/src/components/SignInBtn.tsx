import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const ClerkBtn = () => {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default ClerkBtn;
