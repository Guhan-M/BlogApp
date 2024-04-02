import React, { useState,useEffect } from 'react'
import axios from 'axios'
import BlogCard from './BlogCard'
import { API_URL } from '../App'

function Home() {
  let [blogs,setBlogs]=useState([])
const getBlogs=async()=>{
  try{
    let res=await axios.get(API_URL)
    let filterdata=res.data.filter((e)=>e.status)
    setBlogs(filterdata)
  }
  catch(error){
    console.log(error)
  }
}

useEffect(()=>{
  getBlogs()
},[])

  return <>
    <div className='container-fluid home-wrapper'>
        {
          blogs.map((e)=>{ return <BlogCard title={e.title} description={e.description} image={e.image} key={e.id}/>})
        }
    </div>
  </>
}

export default Home