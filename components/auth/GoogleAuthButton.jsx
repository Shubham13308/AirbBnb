"use client";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";


export default function GoogleAuthButton({ type, onSuccess }) {
  const handleSuccess = (credentialResponse) => {
    try {
      

        onSuccess(credentialResponse);
   


    } catch (err) {
      toast.error("Failed to decode token");
      console.error(err);
    }
  };

  const handleError = () => {
    toast.error("Google Authentication Failed");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
}
