import React ,{useState, useEffect}from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { API_URL } from '../App';
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router-dom';

function Edit() {
  const navigate=useNavigate()
  let parms=useParams()
  let [blogs,setBlogs]=useState([])
  let [title,setTitle] = useState("")
  let [description,setDesc] = useState("")
  let [image,setImage] = useState("")


  
useEffect(()=>{
  const getBlogs=async()=>{
    try{
      let res=await axios.get(`${API_URL}/${parms.id}`)
      setBlogs(res.data)
    }
    catch(error){
      console.log(error)
    }
  }
  getBlogs()
},[])

useEffect(() => {
if (blogs.title) setTitle(blogs.title);
if (blogs.description) setDesc(blogs.description);
if (blogs.image) setImage(blogs.image);
}, [blogs]);

const handleSubmit=async()=>{
  try{
    let data={title,description,image}
    let res=await axios.put(`${API_URL}/${parms.id}`,data)
    if(res.status===200){
      alert("updated")
      setBlogs(res.data)
      navigate('/dashboard')
    }

  }
  catch(error){
    console.log(error)
  }
}

  return <>
<div className='create-wrapper container-fluid'>
    <div className='form-wrapper'>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image Url</Form.Label>
        <Form.Control type="text" placeholder="Image Url" value={image} onChange={(e)=>setImage(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control as="textarea" placeholder='Description' value={description}onChange={(e)=>setDesc(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" onClick={()=>handleSubmit()}>
        Submit
      </Button>
    </Form>
    </div>
    <div className='preview-wrapper'>
      <h3 className='text-center'>Preview</h3>
        <BlogCard title={title} image={image} description={description}/>
    </div>
  </div>
 </>
}

export default Edit