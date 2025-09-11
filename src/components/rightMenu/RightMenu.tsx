import Ad from "../Ad";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { Suspense } from "react";

export default function RightMenu() {
  // user dummy untuk contoh tampilan
  const dummyUser = {
    id: "1",
    username: "dummyuser",
    name: "John",
    surname: "Doe",
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
      <Suspense fallback="loading...">
        <UserInfoCard user={dummyUser} />
      </Suspense>
      <Suspense fallback="loading...">
        <UserMediaCard user={dummyUser} />
      </Suspense>
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
}
