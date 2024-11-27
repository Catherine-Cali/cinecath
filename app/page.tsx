import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login'); // Redirige automatiquement vers la page login
}
