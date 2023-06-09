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
      <div className="px-8 basis-2/6">
        <h2 className="text-xl font-bold pb-2 border-b border-gray-100">
          {title}
        </h2>
        <pre className="whitespace-pre-wrap pt-2">{content}</pre>
      </div>
    </section>
  );
};
