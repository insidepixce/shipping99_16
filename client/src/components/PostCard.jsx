import { useNavigate } from "react-router";

export const PostCard = ({ postId, imageSrc, title, content }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate(`/detail/${postId}`, { state: { imageSrc } });
  };
  return (
    <li
      className="flex flex-col items-center justify-center gap-1 m-2 list-none cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={imageSrc}
        alt="kwoo"
        className="w-60 "
        style={{ aspectRatio: 1 }}
      />

      <div className="flex flex-col items-center">
        <p className="font-semibold my-2 line-clamp-2">{title}</p>
      </div>
    </li>
  );
};
