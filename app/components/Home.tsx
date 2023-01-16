import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { Link } from "react-router-dom";
import getPosts from "~/model/posts.server";

type LoderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return json<LoderData>({ posts });
};
const Home = () => {
  const { posts } = useLoaderData() 
  return (
    <div>
      <h1>Welcome to Blog site</h1>
      <h2>All sites</h2>
      <Link to={"./posts/admin"}>Admin</Link>
      <ul>
        {posts.map((p) => (
          <li>
            <Link key={p.title} to={`./posts/${p.slug}`}>
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
