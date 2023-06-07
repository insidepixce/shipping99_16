import { PostCard } from "../components/PostCard";

export const Posts = () => {
  const aaa = new Array(10).fill(0);

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
        {aaa.map((e, i) => {
          return <PostCard key={i} postId={i} />;
        })}
      </ul>
    </>
  );
};
