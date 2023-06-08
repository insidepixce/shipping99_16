import { useLocation } from "react-router-dom";

export const PostDetail = () => {
  const {
    state: { imageSrc, title, content },
  } = useLocation();

  return (
    <section className="flex flex-col lg:flex-row">
      <article className="basis-4/6">
        <img
          src={imageSrc}
          alt="kwoo"
          className="w-full h-auto max-w-640 p-4"
        />
      </article>
      <div className="p-8 ">
        <h2 className="text-xl font-bold">{title}</h2>
        <pre className="whitespace-pre-wrap">{content}</pre>
      </div>
    </section>
  );
};
