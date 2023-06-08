import { useEffect, useState } from "react";
import { PostCard } from "../components/PostCard";
import axios from "axios";

export const Posts = () => {
  const [feeds, setFeeds] = useState();

  useEffect(() => {
    const data = fetch("/api/feeds")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const dataWithImageSrc = data.map((e, i) => {
          const imageSrc = `data:image/jpeg;base64,${e.image}`;
          return { ...e, image: imageSrc };
        });

        setFeeds(dataWithImageSrc);
      });
  }, []);

  if (!feeds) {
    return <div></div>;
  }

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
        {feeds.map((e, i) => {
          const imageSrc = e.image;
          const title = e.title;
          const content = e.content;
          return (
            <PostCard
              key={i}
              postId={i}
              imageSrc={imageSrc}
              title={title}
              content={content}
            />
          );
        })}
      </ul>
    </>
  );
};
