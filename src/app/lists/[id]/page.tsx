// Contoh untuk halaman lain (HomePage, ProfilePage, dll)
"use client";

import dynamic from "next/dynamic";
import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";

const LeftMenu = dynamic(() => import("@/components/leftMenu/LeftMenu").then((m) => m.default ?? m), { 
  ssr: false,
  loading: () => <LeftMenuSkeleton />
});

const RightMenu = dynamic(() => import("@/components/rightMenu/RightMenu").then((m) => m.default ?? m), { 
  ssr: false,
  loading: () => <RightMenuSkeleton />
});

export default function OtherPage() {
  return (
    <div className="flex gap-6 pt-6">
      <LeftMenu type={"home"} /> {/* Sesuaikan type sesuai halaman */}
      
      <main className="w-full lg:w-[70%] xl:w-[60%]">
        {/* Konten halaman */}
      </main>

      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}