import React,{useState,useEffect}from 'react'
import Table from 'react-bootstrap/Table';
import { API_URL } from '../App';
import axios from 'axios';
import Edit from './Edit';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  let navigate=useNavigate()
  let [blogs,setBlogs]=useState([])
 

const getBlogs=async()=>{
  try{
    let res=await axios.get(API_URL)
    setBlogs(res.data)
  }
  catch(error){
    console.log(error)
  }
}

const changelocalstatus=(blog)=>{
  let index=0
  for(let i=0;i<blogs.length;i++){
    if(blogs[i].id===blog.id){
      index=i;
      break;
    }
  }
  let newarray=[...blogs]
  newarray.splice(index,1,blog)
  setBlogs(newarray)
}


const handleToggle=async(blog)=>{
  try{
    blog.status=!blog.status
    // changelocalstatus(blog)
    let res= await axios.put (`${API_URL}/${blog.id}`,blog)
    if(res.status===200){
      getBlogs()
    }
  }
  catch(error){
    console.log(error)
  }
}

const handleDelete=async(blog)=>{
  try{
    let res= await axios.delete (`${API_URL}/${blog.id}`)
    if(res.status===200){
      getBlogs()
    }
  }
  catch(error){
    console.log(error)
  }
}

useEffect(()=>{
  getBlogs()
},[])

  return <>
 <div className='container-fluid'>
   <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Image</th>
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
       {
        blogs.map((e)=>{
        return <tr key={e.id}>
          <td>{e.id}</td>
          <td>{e.title}</td>
          <td><img src={e.image} style={{width:"100px"}}></img></td>
          <td><div className='description'>{e.description}</div></td>
          <td>
                <label className="switch">
                  <input type="checkbox" defaultChecked={e.status} onClick={()=>handleToggle(e)}/>
                  <span className="slider round"></span>
                </label>
                </td>
          <td><i className="fa-solid fa-trash cursor-pointer"  onClick={()=>handleDelete(e)}></i>
          &nbsp;
          <i className="fa-solid fa-pen cursor-pointer"  onClick={()=>navigate(`/edit/${e.id}`)}></i>
          </td>
        </tr>
       })}
      </tbody>
    </Table>
    </div>
  
  </>
}

export default Dashboard