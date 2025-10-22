import Image from "next/image";
import Comments from "./Comments";
import PostInteraction from "./PostInteraction";

export default function Post() {
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/noAvatar.png"
            width={40}
            height={40}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">Guest User</span>
        </div>
      </div>

      {/* DESC */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image
            src="/dummycover.png"
            fill
            className="object-cover rounded-md"
            alt=""
          />
        </div>
        <p>This is a sample post description.</p>
      </div>

      <PostInteraction />
      <Comments />
    </div>
  );
}