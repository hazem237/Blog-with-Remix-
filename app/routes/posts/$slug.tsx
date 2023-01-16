import {marked} from "marked"
import { json, LoaderFunction, useLoaderData } from "react-router"
import { Link } from "react-router-dom"
import getPosts, { getPostBasedSlug } from "~/model/posts.server"
import invariant from "tiny-invariant" 

type LoaderDataType ={
    title:string
    html : string
}
export const loader:LoaderFunction=async({params})=>{
  const {slug} = params 
  invariant(slug , "slug is required !")
  const post = await getPostBasedSlug(slug)
  invariant(post , `post is required ${slug}`)
  const html = marked(post.markdown)
  return json<LoaderDataType>({title:post.title , html})
}

export default function RoutesPost () {
    const {title , html} = useLoaderData() as LoaderDataType;
    return (
        <main>
            <div>{title}</div>
            <div dangerouslySetInnerHTML={{__html:html}}/>
            <Link to={''}>
                Home
            </Link>
        </main>
    )
}

