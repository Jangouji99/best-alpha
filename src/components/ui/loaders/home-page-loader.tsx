const HomePageLoader = () => {
  return (
    <div className="space-y-8">
      {/* Banner Skeleton */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-48 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-48 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Features Section Skeleton */}
      <div className="grid grid-cols-4 gap-4">
        {Array(4).map((_, index) => (
          <div key={index} className="h-16 bg-gray-200 rounded-md animate-pulse"></div>
        ))}
      </div>

      {/* Best Sellers Title Skeleton */}
      <div className="h-8 w-1/3 bg-gray-200 rounded-md animate-pulse"></div>

      {/* Best Sellers Product Grid Skeleton */}
      <div className="grid grid-cols-4 gap-6">
        {Array(12).map((_, index) => (
          <div key={index} className="p-4 border rounded-md shadow-md animate-pulse">
            <div className="h-24 bg-gray-200 mb-4 rounded"></div>
            <div className="h-6 bg-gray-200 mb-2 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Deals of the Week Skeleton */}
      <div className="grid grid-cols-4 gap-6">
        {/* Featured Deal */}
        <div className="col-span-1 p-4 border rounded-md shadow-md animate-pulse">
          <div className="h-24 bg-gray-200 mb-4 rounded"></div>
          <div className="h-6 bg-gray-200 mb-2 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>

        {/* Top Picks Product Grid Skeleton */}
        <div className="col-span-3 grid grid-cols-3 gap-6">
          {Array(9).map((_, index) => (
            <div key={index} className="p-4 border rounded-md shadow-md animate-pulse">
              <div className="h-24 bg-gray-200 mb-4 rounded"></div>
              <div className="h-6 bg-gray-200 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageLoader;
