import Image from "next/image";
import Link from "next/link";

const UserMediaCard = ({ user }: { user: any }) => {
  const postsWithMedia = [
    { id: 1, img: "/dummycover.png" },
    { id: 2, img: "/dummycover.png" },
    { id: 3, img: "/dummycover.png" },
    { id: 4, img: "/dummycover.png" },
    { id: 5, img: "/dummycover.png" },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {/* BOTTOM (sesuai ukuran Code 1) */}
      <div className="flex gap-4 justify-between flex-wrap">
        {postsWithMedia.length ? (
          postsWithMedia.map((post) => (
            <div key={post.id} className="relative w-1/5 h-24">
              <Image
                src={post.img}
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center w-full">No media found!</p>
        )}
      </div>
    </div>
  );
};

export default UserMediaCard;
