import { json, LoaderFunction, useLoaderData } from "react-router";

import getPosts from "~/model/posts.server";
import Home from "../components/Home";

type LoderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return json<LoderData>({ posts });
};

export default function Index() {
  const { posts } = useLoaderData() as LoderData;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
    <Home posts={posts}/>
    </div>
  );
}