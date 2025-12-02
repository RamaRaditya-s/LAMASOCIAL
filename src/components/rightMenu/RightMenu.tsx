import Ad from "../Ad";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { Suspense } from "react";

import UserInfoCardSkeleton from "../skeleton/UserInfoCardSkeleton";
import UserMediaCardSkeleton from "../skeleton/UserMediaCardSkeleton";
import FriendRequestsSkeleton from "../skeleton/FriendRequestsSkeleton";
import BirthdaysSkeleton from "../skeleton/BirthdaysSkeleton";
import AdSkeleton from "../skeleton/AdSkeleton";

export default function RightMenu() {
  const dummyUser = {
    id: "1",
    username: "lonebee",
    name: "Lone",
    surname: "Bee",
    description: "Life is beautiful...",
    city: "New York",
    school: "MIT",
    work: "Apple Inc.",
    website: "https://example.com",
    createdAt: new Date().toISOString(),
    cover: "/noCover.png",
  };

  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<UserInfoCardSkeleton />}>
        <UserInfoCard user={dummyUser} />
      </Suspense>

      <Suspense fallback={<UserMediaCardSkeleton />}>
        <UserMediaCard user={dummyUser} />
      </Suspense>

      <Suspense fallback={<FriendRequestsSkeleton />}>
        <FriendRequests />
      </Suspense>

      <Suspense fallback={<BirthdaysSkeleton />}>
        <Birthdays />
      </Suspense>

      <Suspense fallback={<AdSkeleton />}>
        <Ad size="md" />
      </Suspense>
    </div>
  );
}
