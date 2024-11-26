"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function App() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

  // Met à jour le username
  const handleChangeU = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // Met à jour le password
  const handleChangeP = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Empêche le rechargement de la page lors de la soumission du formulaire
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche la page de se recharger

    // Utilise signIn de NextAuth pour authentifier l'utilisateur
    const result = await signIn("credentials", {
      redirect: false, // Ne redirige pas immédiatement
      username,
      password,
    });

    if (result?.ok) {
      console.log("Authentification réussie");
      router.push('/dashboard'); // Redirige vers le tableau de bord en cas de succès
    } else {
      setHasError(hasError);
      router.push('/error');
   // Redirige vers une page d'erreur en cas d'échec
    }
  };

  
  return (
    <div className={`min-h-screen min-w-full flex items-center justify-center`}>
      <Card className={`w-full sm:w-[100px] md:w-[300px] lg:w-[400px] p-4 border-0 sm:border shadow-none sm:shadow`}>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex justify-center">🎬 Cinetica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Enter your username" 
                  value={username} 
                  onChange={handleChangeU} 
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  type="password" 
                  id="password" 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={handleChangeP} 
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" variant="outline">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
