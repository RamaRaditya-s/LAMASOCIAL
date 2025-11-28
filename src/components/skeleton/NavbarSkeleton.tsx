import MobileMenu from "../MobileMenu";

const NavbarSkeleton = () => {
  return (
    <div className="h-24 flex items-center justify-between animate-pulse">
      {/* LEFT - Logo Skeleton */}
      <div className="md:hidden lg:block w-[20%]">
        <div className="w-32 h-6 bg-gray-300 rounded"></div>
      </div>

      {/* CENTER - Links and Search Skeleton */}
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        {/* LINKS SKELETON */}
        <div className="flex gap-6 text-gray-600">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="w-16 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        {/* SEARCH BAR SKELETON */}
        <div className="flex p-2 bg-slate-100 items-center rounded-xl w-48">
          <div className="flex-1 h-4 bg-gray-300 rounded"></div>
          <div className="w-4 h-4 bg-gray-300 rounded ml-2"></div>
        </div>
      </div>

      {/* RIGHT - Icons and User Skeleton */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        {/* Loading state for Clerk */}
        <div className="flex items-center gap-4">
          {/* Icons Skeleton */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-6 h-6 bg-gray-300 rounded"></div>
          ))}
          
          {/* User Avatar Skeleton */}
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>

        <MobileMenu />
      </div>
    </div>
  );
};

export default NavbarSkeleton;