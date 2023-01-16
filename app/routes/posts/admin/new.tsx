import { ActionFunction, redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import React from 'react'
import { createPost } from '~/model/posts.server';

export const action:ActionFunction=async({request})=>{
    const dataForm = await request.formData();
    const slug = dataForm.get('slug')
    const title= dataForm.get('title')
    const markdown = dataForm.get('markdown')
    createPost({slug:slug , title:title , markdown : markdown})
    return redirect('/posts/admin')
}
export default function newPostRoutes ()  {
  return (
    <div>
        <Form method='post'>
            <label>Title</label>
            <input name='title'/>
            <label>Slug</label>
            <input name='slug'/>
            <label>Markdown</label>
            <input name='markdown'/>
            <button type='submit'>Create post</button>
        </Form>
    </div>
  )
}
