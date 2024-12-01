import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLoginUseCase = () => {
  const [credentials, setCredentials] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const router = useRouter();

  const loginAndRedirectIfSuccess = async (event: React.FormEvent) => {
    // Empêcher le comportement par défaut de la soumission du formulaire
    event.preventDefault();

    // Effectuer la connexion via NextAuth
    const signInResponse = await signIn("credentials", {
      username: credentials.username,
      password: credentials.password,
      redirect: false, // Empêche la redirection automatique, vous gérez ça manuellement
    });

    console.log(credentials, signInResponse); // Afficher les informations pour débogage

    if (signInResponse?.ok) {
      router.push("/dashboard");  // Rediriger vers le tableau de bord après la connexion réussie
    } else {
      const errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
      alert(errorMessage);  // Alerte en cas d'échec
      router.push("/login");  // Rediriger vers la page de login si échec
    }
  };

  return { credentials, setCredentials, loginAndRedirectIfSuccess };
};
