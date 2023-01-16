import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import React from "react";
import invariant from "tiny-invariant";
import { createPost, getPostBasedSlug, getPosts } from "~/model/posts.server";

type ActionData =
  | {
      slug: null | string;
      title: null | string;
      markdown: null | string;
    }
  | undefined;
export const loader: LoaderFunction = async ({ params }) => {
  if (params.slug === "new") {
    return json({});
  }

  const posts = await getPostBasedSlug(params.slug);
  return json({ posts });
};
export const action: ActionFunction = async ({ request, params }) => {
  const dataForm = await request.formData();
  const slug = dataForm.get("slug");
  const title = dataForm.get("title");
  const markdown = dataForm.get("markdown");
  const error: ActionData = {
    slug: slug ? null : "slug is required",
    title: title ? null : "title is reqired",
    markdown: markdown ? null : "markdown is required",
  };
  const hasError = Object.values(error).some((el) => el);
  if (hasError) {
    return json<ActionData>(error);
  }
  invariant(typeof slug === "string", "slug must be String");
  invariant(typeof title === "string", "title must be String");
  invariant(typeof markdown === "string", "markdown must be String");
  if (params.slug == "new") {
    createPost({ slug: slug, title: title, markdown: markdown });
  } else {
    /**/
  }
  return redirect("/posts/admin");
};
export default function newPostRoutes() {
  const error = useActionData() as ActionData;
  const transition = useTransition();
  const isCreatign = Boolean(transition.submission);
  const data = useLoaderData();
  return (
    <div>
      <Form method="post" key={data.posts?.slug ?? "new"}>
        <h1>{data.posts?.slug}</h1>
        <label>
          Title
          {error?.title ? (
            <em style={{ color: "red" }}>{error.title}</em>
          ) : null}{" "}
        </label>
        <input name="title" defaultValue={data.posts?.title} />
        <label>
          Slug{" "}
          {error?.slug ? <em style={{ color: "red" }}>{error.slug}</em> : null}
        </label>
        <input name="slug" defaultValue={data.posts?.slug}  />
        <label>
          Markdown{" "}
          {error?.markdown ? (
            <em style={{ color: "red" }}>{error.markdown}</em>
          ) : null}
        </label>
        <input name="markdown" defaultValue={data.posts?.markdown} />
        <button type="submit" disabled={isCreatign}>
          {isCreatign ? "Creating ..." : "Create post"}
        </button>
      </Form>
    </div>
  );
}
