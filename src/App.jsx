import React from 'react'
import Dashboard from './components/Dashboard'
import {BrowserRouter, Routes,Route, Navigate} from 'react-router-dom'
import Edit from './components/Edit'
import Create from './components/Create'
import Home from './components/Home'
import TopBar from './components/TopBar'
export const API_URL="https://65e8b8914bb72f0a9c5039ac.mockapi.io/blogs"
function App() {
  return <>
  <BrowserRouter>
  <TopBar/>
  <Routes>
  <Route path='/dashboard' element={<Dashboard/>}/>
  <Route path='/edit/:id' element={<Edit/>}/>
  <Route path='/create' element={<Create/>}/>
  <Route path='/' element={<Home/>}/>
  <Route path='*' element={<Navigate to={"/"}/>}/>
  </Routes>
  </BrowserRouter>
  </>
}

export default App