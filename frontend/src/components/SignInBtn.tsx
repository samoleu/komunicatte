import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ClerkBtn = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (isSignedIn) {
      router.push('/app'); // Redirect to the /app page when signed in
    }
  }, [isSignedIn, router]);

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-black text-white py-2 px-4 rounded-lg text-lg hover:bg-gray-800">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div>-- LOGGED IN --</div>
      </SignedIn>
    </>
  );
};

export default ClerkBtn;
