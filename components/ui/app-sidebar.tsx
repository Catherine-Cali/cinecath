import { LayoutGrid, Film, Users, Smile, Airplay } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

// Pour le discover
const discoverItem = {
  title: "Discover",
  url: "/dashboard/discover", // URL mise à jour
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
      { title: "On the air", url: "/dashboard/tv/on-the-air", icon: Airplay },
      { title: "Popular", url: "/dashboard/tv/popular", icon: Users },
      { title: "Top Rated", url: "/dashboard/tv/top-rated", icon: Smile },
    ],
  },
];

export function AppSidebar() {
  const router = useRouter();

  const handleNavigation = (url: string) => {
    if (!url || url === "#") {
      console.warn("URL invalide : ", url);
      return;
    }
    router.push(url);
  };

  return (
    <div className="w-full h-full p-4">
      <nav>
        {/* Pour le discover */}
        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => handleNavigation(discoverItem.url)}>
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
  );
}
