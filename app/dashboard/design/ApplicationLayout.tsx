'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import ApplicationRepositoryContextProvider from "@/repositories/ApplicationRepositoryContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <QueryClientProvider client={queryClient}>
        <ApplicationRepositoryContextProvider>
          <SidebarProvider>
            <div className="h-screen w-full flex flex-col font-sans">
              <Header />
              <div className="border-t border-gray-300"></div>
              <div className="bg-white flex-1 flex">
                {/* Sidebar avec une largeur fixe */}
                <div className="w-50">
                  <Sidebar />
                </div>

                {/* Contenu principal avec défilement horizontal */}
                <div className="flex-1 overflow-x-auto border-l border-gray-300">
                  <Content>{children}</Content>
                </div>
              </div>
            </div>
          </SidebarProvider>
        </ApplicationRepositoryContextProvider>
      </QueryClientProvider>
    </div>
  );
}
