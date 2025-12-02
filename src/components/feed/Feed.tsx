import Post from "./Post";
interface FeedProps {
  username?: string;
}
export default function Feed({ username }: FeedProps) {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      <Post />
    </div>
  );
}