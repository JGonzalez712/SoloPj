import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CreateRemainder from './views/CreateRemainder.jsx'
import  DisplayAll  from './views/DisplayAll.jsx'
import Update from './views/Update.jsx'
import Navbar from './components/navbar.jsx'
import ShowOne from './views/ShowOne.jsx'




function App() {


  return (
    <>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<CreateRemainder/>}/>
          <Route path="/reminders" element={<DisplayAll/>}/>
          <Route path="/reminders/:id/edit" element={<Update/>}/>
          <Route path="/reminders/:id/show" element={<ShowOne/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
