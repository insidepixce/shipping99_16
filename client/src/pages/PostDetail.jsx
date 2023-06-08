import { useLocation } from "react-router-dom";

export const PostDetail = () => {
  const {
    state: { post },
  } = useLocation();
  const {} = post;

  return (
    <section className="flex flex-col lg:flex-row">
      <article className="basis-4/6">
        <img
          src="/image/kwoo2.jpeg"
          alt="kwoo"
          className="w-full h-auto max-w-640 p-4"
        />
      </article>
      <div className="p-8 ">
        <h2 className="text-xl font-bold">title이 들어갑니다</h2>
        <pre className="whitespace-pre-wrap">description이 들어갑니다</pre>
      </div>
    </section>
  );
};
