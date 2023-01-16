import {marked} from "marked"
import { json, LoaderFunction, useLoaderData } from "react-router"
import { Link } from "react-router-dom"
import { getPostBasedSlug } from "~/model/posts.server"

export const loader:LoaderFunction=async({params})=>{
  const {slug} = params 
  const post = await getPostBasedSlug(slug)
  const html = marked(post.markdown)
  return json({post , html})
}

export default function RoutesPost () {
    const {post , html} = useLoaderData();
    return (
        <main>
            <div>{post.title}</div>
            <div dangerouslySetInnerHTML={{__html:html}}/>
            <div>{post.createdAt}</div>
            <Link to={''}>
                Home
            </Link>
        </main>
    )
}


