import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";

interface GoogleSignInButtonProps {
  children: React.ReactNode;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  children,
}) => {
  const loginWithGoogle = () =>
    signIn("google", {
      callbackUrl: "http://kronos-pro.vercel.app/app",
    });

  return (
    <Button onClick={loginWithGoogle} className="w-full">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
