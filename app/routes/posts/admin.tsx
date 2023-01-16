import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {getPosts} from "~/model/posts.server";

type LoderData = {
    posts: Awaited<ReturnType<typeof getPosts>>;
  };
  
  export const loader: LoaderFunction = async () => {
    const posts = await getPosts();
    return json<LoderData>({ posts });
  };

const admin = () => {
    const { posts } = useLoaderData();
    return (
      <div>
        <h1>Admin</h1>
        <ul>
          {posts.map((p) => (
            <li>
              <Link key={p.title} to={`./posts/${p.slug}`}>
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
        <main><Outlet /></main>
      </div> )
}

export default admin