import CommentList from "./CommentList";

const dummyComments = [
  {
    id: 1,
    desc: "Great post!",
    user: { id: "1", username: "Alice", avatar: "/noAvatar.png" },
  },
];

export default function Comments() {
  return (
    <div>
      <CommentList comments={dummyComments} />
    </div>
  );
}
