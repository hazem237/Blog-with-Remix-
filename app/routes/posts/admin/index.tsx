import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminIndexRoute (){
  return (
    <div>
        <Link to={'new'} >
            Create New Post
        </Link>
    </div>
  )
}

