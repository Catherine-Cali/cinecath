'use client'
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import ApplicationRepositoryContextProvider  from "@/repositories/ApplicationRepositoryContext";



export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient();

  return (
        <div className = "h-screen w-screen flex  justify-center items-center">
          <QueryClientProvider client = {queryClient}>
          <ApplicationRepositoryContextProvider>
          <SidebarProvider/> 
          {children}
          </ApplicationRepositoryContextProvider>
          </QueryClientProvider>
        </div>
  );
}