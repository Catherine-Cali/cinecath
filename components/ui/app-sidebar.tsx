"use client";

import { LayoutGrid, Film, Users, Smile, Airplay, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

// Pour le discover
const discoverItem = {
  title: "Discover",
  url: "/dashboard", // URL mise à jour
  icon: LayoutGrid,
};

// Pour les autres items
const items = [
  {
    title: "Movies",
    url: "#",
    children: [
      { title: "Now Playing", url: "/dashboard/movies/now-playing", icon: Film },
      { title: "Popular", url: "/dashboard/movies/popular", icon: Users },
      { title: "Top Rated", url: "/dashboard/movies/top-rated", icon: Smile },
    ],
  },
  {
    title: "TV Shows",
    url: "#",
    children: [
      { title: "On the air", url: "/dashboard/shows/on-the-air", icon: Airplay },
      { title: "Popular", url: "/dashboard/shows/popular", icon: Users },
      { title: "Top Rated", url: "/dashboard/shows/top-rated", icon: Smile },
    ],
  },
];

export function AppSidebar() {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false); // État pour mobile

  const handleNavigation = (url: string) => {
    if (!url || url === "#") {
      console.warn("URL invalide : ", url);
      return;
    }
    router.push(url);
    setIsMobileOpen(false); // Ferme la sidebar sur navigation
  };

  return (
    <>
      {/* Bouton d'ouverture de la sidebar en mobile */}
      <div className="md:hidden ml-2">
        <Button
          variant="ghost"
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar en mobile (Sheet) */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="w-[16rem] bg-white dark:bg-gray-900">
          <nav className="p-2">
            {/* Pour le discover */}
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation(discoverItem.url)}
              >
                <div className="flex items-center">
                  <discoverItem.icon className="mr-2" />
                  {discoverItem.title}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Pour films et séries */}
            {items.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton>
                  <div className="flex items-center text-gray-600">
                    {item.title}
                  </div>
                </SidebarMenuButton>

                {/* Sous-items */}
                {item.children && (
                  <SidebarMenuSub>
                    {item.children.map((subItem, subIndex) => (
                      <SidebarMenuSubItem key={subIndex}>
                        <SidebarMenuSubButton
                          onClick={() => handleNavigation(subItem.url)}
                        >
                          <div className="flex items-center">
                            <subItem.icon className="mr-2" />
                            {subItem.title}
                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Sidebar en desktop */}
      <div className="hidden md:block w-50 h-full p-4">
        <nav>
          {/* Pour le discover */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleNavigation(discoverItem.url)}
            >
              <div className="flex items-center">
                <discoverItem.icon className="mr-2" />
                {discoverItem.title}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Pour films et séries */}
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton>
                <div className="flex items-center text-gray-600">
                  {item.title}
                </div>
              </SidebarMenuButton>

              {/* Sous-items */}
              {item.children && (
                <SidebarMenuSub>
                  {item.children.map((subItem, subIndex) => (
                    <SidebarMenuSubItem key={subIndex}>
                      <SidebarMenuSubButton
                        onClick={() => handleNavigation(subItem.url)}
                      >
                        <div className="flex items-center">
                          <subItem.icon className="mr-2" />
                          {subItem.title}
                        </div>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </nav>
      </div>
    </>
  );
}
