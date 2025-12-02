import Image from "next/image";
import Link from "next/link";

const ProfileCard = () => {
  // Data dummy
  const user = {
    cover: "/dummycover.png",
    avatar: "/user.png",
    name: "Lone",
    surname: "Bee",
    username: "mramar",
    _count: {
      followers: 124,
    },
  };

  if (!user) return null; // sama seperti versi asli, lebih aman

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      {/* COVER + AVATAR */}
      <div className="h-20 relative">
        <Image
          src={user.cover || "/noCover.png"}
          alt="cover"
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={user.avatar || "/noAvatar.png"}
          alt="avatar"
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>

      {/* INFO USER */}
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">
          {user.name && user.surname
            ? `${user.name} ${user.surname}`
            : user.username}
        </span>

        {/* FOLLOWERS */}
        <div className="flex items-center gap-4">
          <div className="flex">
            {[1, 2, 3].map((i) => (
              <Image
                key={i}
                src="https://images.pexels.com/photos/19578755/pexels-photo-19578755/free-photo-of-woman-watching-birds-and-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                alt={`follower-${i}`}
                width={12}
                height={12}
                className="rounded-full object-cover w-3 h-3"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {user._count.followers} Followers
          </span>
        </div>

        {/* BUTTON */}
        <Link href={`/profile/${user.username}`}>
          <button className="bg-blue-500 text-white text-xs p-2 rounded-md">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;