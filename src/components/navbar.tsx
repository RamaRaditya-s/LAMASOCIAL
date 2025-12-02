"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState, useEffect } from "react";
import NavbarSkeleton from "./skeleton/NavbarSkeleton";

const Navbar = () => {
  const [loading, setLoading] = useState(true);

  // 🔍 TAMBAHAN STATE SEARCH
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    window.location.href = `/search?query=${encodeURIComponent(query)}`;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <NavbarSkeleton />;
  }

  return (
    <div className="h-24 flex items-center justify-between px-4 md:px-8 flex-wrap gap-3">
      {/* LEFT */}
      <div className="w-auto">
        <Link href="/" className="font-bold text-xl text-blue-600">
          LAMASOCIAL
        </Link>
      </div>

      {/* CENTER */}
      <div className="hidden md:flex flex-1 justify-center items-center text-sm gap-8">
        {/* LINKS */}
        <div className="flex gap-6 text-gray-600">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <Image
              src="/home.png"
              alt="Homepage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Homepage</span>
          </Link>
          <Link
            href="/friends"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <Image
              src="/friends.png"
              alt="Friends"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Friends</span>
          </Link>
          <Link
            href="/stories"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <Image
              src="/stories.png"
              alt="Stories"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Stories</span>
          </Link>
        </div>

        {/* 🔍 SEARCH BAR (SUDAH DIUPDATE) */}
        <form
          onSubmit={handleSearch}
          className="flex p-2 bg-slate-100 items-center rounded-xl border border-transparent focus-within:border-blue-300 transition-colors"
        >
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none w-40 sm:w-56"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">
            <Image src="/search.png" alt="Search" width={14} height={14} />
          </button>
        </form>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 xl:gap-8 justify-end w-auto">
        <ClerkLoading>
          <div className="flex items-center gap-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-6 h-6 bg-gray-300 rounded animate-pulse"
              ></div>
            ))}
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <Image src="/people.png" alt="People" width={24} height={24} />
            </div>
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <Image src="/messages.png" alt="Messages" width={20} height={20} />
            </div>
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <Image
                src="/notifications.png"
                alt="Notifications"
                width={20}
                height={20}
              />
            </div>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-2 text-sm hover:text-blue-600 transition-colors">
              <Image src="/login.png" alt="Login" width={20} height={20} />
              <Link href="/sign-in" className="text-gray-600">
                Login/Register
              </Link>
            </div>
          </SignedOut>
        </ClerkLoaded>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
