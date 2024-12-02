import DiscoverCarousel from "./accueil/components/DiscoverCarousel";

  
export default function DashboardPage() {
  return (
    <div className="grid grid-rows-3 gap-4 p-4 h-screen">
      {/* Case 1: Carousel */}
      <div className="bg-white p-4 flex items-center justify-center h-full w-full">
        <DiscoverCarousel />
      </div>

      {/* Case 2 */}
      <div className="bg-gray-300 p-4 flex items-center justify-center">
        <h3>Carrousel Movies</h3>
      </div>

      {/* Case 3 */}
      <div className="bg-gray-400 p-4 flex items-center justify-center">
        <h3>Carousel TV Shows</h3>
      </div>
    </div>
  );
}
