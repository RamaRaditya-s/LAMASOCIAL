import Image from "next/image";
import Link from "next/link";

const FriendRequests = () => {
  // dummy requests
  const requests = [
    {
      id: 1,
      sender: { id: "2", username: "janedoe", name: "Jane", surname: "Doe", avatar: "/noAvatar.png" },
    },
  ];

  if (requests.length === 0) return null;
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>
      <div className="">
        {requests.map((req) => (
          <div className="flex items-center justify-between" key={req.id}>
            <div className="flex items-center gap-4">
              <Image
                src={req.sender.avatar}
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold">
                {req.sender.name + " " + req.sender.surname}
              </span>
            </div>
            <div className="flex gap-3 justify-end">
              <button>
                <Image src="/accept.png" alt="" width={20} height={20} />
              </button>
              <button>
                <Image src="/reject.png" alt="" width={20} height={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
