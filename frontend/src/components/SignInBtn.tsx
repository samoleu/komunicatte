import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const ClerkBtn = () => {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-black text-white py-2 px-4 rounded-lg text-lg hover:bg-gray-800">Sign in</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default ClerkBtn;
