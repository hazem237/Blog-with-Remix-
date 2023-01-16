import React from "react";
import { Link } from "react-router-dom";

type prop = {
  title: string;
  slug: string;
};
const Home = ({ posts } : prop[]) => {
  return (
    <div>
      <h1>Welcome to Blog site</h1>
      <h2>All sites</h2>
      <Link to={"./posts/admin"}>Admin</Link>
      <ul>
        {posts.map((p) => (
          <li>
            <Link key={p.title} to={`./posts/${p.slug}`} >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
