import { ActionFunction, json, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import React from 'react'
import { createPost } from '~/model/posts.server';

export const action:ActionFunction=async({request})=>{
    const dataForm = await request.formData();
    const slug = dataForm.get('slug')
    const title= dataForm.get('title')
    const markdown = dataForm.get('markdown')
    const error = {
        slug : slug ? null : "slug is required",
        title: title ? null : "title is reqired",
        markdown:markdown ? null : "markdown is required"
    }
    const hasError = Object.values(error).some(el => el)
    if(hasError)
    {
        return json(error)
    }
    createPost({slug:slug , title:title , markdown : markdown})
    return redirect('/posts/admin')
}
export default function newPostRoutes ()  {
    const error = useActionData();
  return (
    <div>
        <Form method='post'>
            <label>Title{ error?.title?<em style={{color:'red'}}>{error.title}</em>:null} </label>
            <input name='title'/>
            <label>Slug { error?.slug?<em style={{color:'red'}}>{error.slug}</em>:null}</label>
            <input name='slug'/>
            <label>Markdown { error?.markdown?<em style={{color:'red'}}>{error.markdown}</em>:null}</label>
            <input name='markdown'/>
            <button type='submit'>Create post</button>
        </Form>
    </div>
  )
}
