"use client";

import { useOptimistic, useState } from "react";

type Props = {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
};

export default function UserInfoCardInteraction({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: Props) {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, action: "follow" | "block") => {
      if (action === "follow") {
        return {
          ...state,
          following: state.following ? false : state.following,
          followingRequestSent:
            !state.following && !state.followingRequestSent,
        };
      }
      return { ...state, blocked: !state.blocked };
    }
  );

  // dummy functions, hanya untuk tampilan
  const follow = async () => {
    switchOptimisticState("follow");
    console.log("Follow clicked (frontend only)");
  };

  const block = async () => {
    switchOptimisticState("block");
    console.log("Block clicked (frontend only)");
  };

  return (
    <>
      <form action={follow}>
        <button type="submit" className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
            ? "Friend Request Sent"
            : "Follow"}
        </button>
      </form>

      <form action={block} className="self-end">
        <button type="submit">
          <span className="text-red-400 text-xs cursor-pointer">
            {optimisticState.blocked ? "Unblock User" : "Block User"}
          </span>
        </button>
      </form>
    </>
  );
}
