import { useNavigate } from "react-router";

export const PostCard = ({ postId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate(`/detail/${postId}`, { state: {} });
  };
  return (
    <li
      className="flex flex-col items-center justify-center gap-1 m-2 list-none cursor-pointer"
      onClick={handleClick}
    >
      <img src="/image/kwoo.jpeg" alt="kwoo" className="w-60 " />

      <div className="flex flex-col items-center">
        <p className="font-semibold my-2 line-clamp-2">Title</p>
        <p className="text-sm opacity-80">Writer</p>
      </div>
    </li>
  );
};
