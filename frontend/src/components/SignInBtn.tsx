import { SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ClerkBtnProps {
  className?: string; // Allow additional custom styles to be passed
  label?: string; // Allow a customizable label for the button
}

const ClerkBtn: React.FC<ClerkBtnProps> = ({ className, label = "Sign in" }) => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/app'); // Redirect to the /app page when signed in
    }
  }, [isSignedIn, router]);

  return (
    <SignedOut>
      <SignInButton mode="modal">
        <button className={`bg-black text-white py-2 px-4 rounded-lg text-lg hover:bg-gray-800 ${className}`}>
          {label}
        </button>
      </SignInButton>
    </SignedOut>
  );
};

export default ClerkBtn;