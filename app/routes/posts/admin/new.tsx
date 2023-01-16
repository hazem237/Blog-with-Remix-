import { ActionFunction, json, redirect } from '@remix-run/node'
import { Form, useActionData, useTransition } from '@remix-run/react'
import React from 'react'
import invariant from 'tiny-invariant';
import { createPost } from '~/model/posts.server';

type ActionData = {
    slug : null | string
    title:null | string
    markdown:null|string
} | undefined
export const action:ActionFunction=async({request})=>{
    const dataForm = await request.formData();
    const slug = dataForm.get('slug')
    const title= dataForm.get('title')
    const markdown = dataForm.get('markdown')
    const error :ActionData = {
        slug : slug ? null : "slug is required",
        title: title ? null : "title is reqired",
        markdown:markdown ? null : "markdown is required"
    }
    const hasError = Object.values(error).some(el => el)
    if(hasError)
    {
        return json<ActionData>(error)
    }
    invariant(typeof slug ==='string' , "slug must be String")
    invariant(typeof title ==='string' , "title must be String")
    invariant(typeof markdown ==='string' , "markdown must be String")

    createPost({slug:slug , title:title , markdown : markdown})
    return redirect('/posts/admin')
}
export default function newPostRoutes ()  {
    const error = useActionData() as ActionData;
    const transition = useTransition();
    const isCreatign = Boolean(transition.submission)
  return (
    <div>
        <Form method='post'>
            <label>Title{ error?.title?<em style={{color:'red'}}>{error.title}</em>:null} </label>
            <input name='title'/>
            <label>Slug { error?.slug?<em style={{color:'red'}}>{error.slug}</em>:null}</label>
            <input name='slug'/>
            <label>Markdown { error?.markdown?<em style={{color:'red'}}>{error.markdown}</em>:null}</label>
            <input name='markdown'/>
            <button type='submit'
            disabled={isCreatign}
            >{isCreatign ? 'Creating ...' : "Create post"}</button>
        </Form>
    </div>
  )
}
