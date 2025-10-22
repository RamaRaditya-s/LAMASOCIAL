"use client";
import { useState, useEffect } from "react";
import AddPost from "@/components/AddPost";
import Stories from "@/components/Stories";
import Feed from "@/components/feed/Feed";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";

// Skeletons
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";
import StoriesSkeleton from "@/components/skeleton/StoriesSkeleton";
import AddPostSkeleton from "@/components/skeleton/AddPostSkeleton";
import FeedSkeleton from "@/components/skeleton/FeedSkeleton";
import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";

const Homepage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulasi fetch data 2 detik
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex gap-6 pt-6">
      {/* LeftMenu */}
      <div className="w-[20%]">
        {loading ? <LeftMenuSkeleton /> : <LeftMenu type="home" />}
      </div>

      {/* Middle Content */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          {loading ? <StoriesSkeleton /> : <Stories />}
          {loading ? <AddPostSkeleton /> : <AddPost />}
          <Feed />
        </div>
      </div>

      {/* RightMenu */}
      <div className="hidden lg:block w-[30%]">
        {loading ? <RightMenuSkeleton /> : <RightMenu />}
      </div>
    </div>
  );
};

export default Homepage;