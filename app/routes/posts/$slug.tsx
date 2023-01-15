import { json, LoaderFunction, useLoaderData } from "react-router"
import { getPostBasedSlug } from "~/model/posts.server"

export const loader:LoaderFunction=async({params})=>{
  const {slug} = params 
  const post = await getPostBasedSlug(slug)
  return json({post})
}

export default function RoutesPost () {
    const {post} = useLoaderData();
    return (
        <main>
            <div>{post.title}</div>
        </main>
    )
}