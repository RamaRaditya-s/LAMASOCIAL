import Image from "next/image";
import Link from "next/link";

const UserMediaCard = ({ user }: { user: any }) => {
  // dummy data (contoh tetap sama)
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

      {/* Grid responsif */}
      <div
        className="
          grid gap-4
          grid-cols-2        /* mobile: 2 kolom */
          sm:grid-cols-3     /* >=640px: 3 kolom */
          md:grid-cols-4     /* >=768px: 4 kolom */
          lg:grid-cols-5     /* >=1024px: 5 kolom */
        "
      >
        {postsWithMedia.length ? (
          postsWithMedia.map((post) => (
            <div key={post.id} className="relative w-full aspect-video">
              <Image
                src={post.img}
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No media found!
          </p>
        )}
      </div>
    </div>
  );
};

export default UserMediaCard;
