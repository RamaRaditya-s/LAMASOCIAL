"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserBirthday {
  id: number;
  name: string;
  surname: string;
  avatar_url: string;
  birthday: string;
}

const Birthdays = () => {
  const [today, setToday] = useState<UserBirthday[]>([]);
  const [upcoming, setUpcoming] = useState<UserBirthday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/birthdays");
        const data = await res.json();

        setToday(data.today || []);
        setUpcoming(data.upcoming || []);
      } catch (err) {
        console.error("Error loading birthdays:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-sm">
        <span className="text-gray-400 text-xs">Loading birthdays...</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Birthdays</span>
      </div>

      {/* TODAY BIRTHDAYS */}
      {today.length > 0 ? (
        today.map((u) => (
          <div key={u.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={u.avatar_url}
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold">{u.name} {u.surname}</span>
            </div>

            <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
              Celebrate
            </button>
          </div>
        ))
      ) : (
        <span className="text-gray-400 text-xs">No birthdays today.</span>
      )}

      {/* UPCOMING */}
      <div className="p-4 bg-slate-100 rounded-lg flex items-center gap-4">
        <Image src="/gift.png" alt="" width={24} height={24} />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-gray-500">
            {upcoming.length} upcoming birthdays
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
