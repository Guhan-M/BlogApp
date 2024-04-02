import React from 'react'
import Card from 'react-bootstrap/Card';
function BlogCard({title,description,image}) {
  return <>
    <Card style={{ width: '30rem', padding:"5px", marginTop:'25px' }}>
      <Card.Img variant="top" src={image?image:"https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"} />
      <Card.Body>
        <Card.Title>{title?title:"Title"}</Card.Title>
        <Card.Text>
          {description?description:"Give some content"}
        </Card.Text>
      </Card.Body>
    </Card>
  </>
}

export default BlogCard