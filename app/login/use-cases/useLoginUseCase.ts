import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLoginUseCase = () => {
  const [credentials, setCredentials] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const router = useRouter();

  const loginAndRedirectIfSuccess = async () => {
    const signInResponse = await signIn("credentials", {
      username: credentials.username,
      password: credentials.password,
      redirect: false,  // Use the correct key for redirect
    });

    if (signInResponse?.ok) {
      router.push("/dashboard");  // Fixed Router to router
    }
    else {
        const errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
        console.error(errorMessage);  // Affichage dans la console
        alert(errorMessage);  // Affichage dans une alerte
    }

  };

  return { credentials, setCredentials, loginAndRedirectIfSuccess };  // Correct return syntax
};
