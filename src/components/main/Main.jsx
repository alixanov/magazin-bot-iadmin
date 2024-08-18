import React from 'react'
import "./main.css"
import Card from '../card/Card'
import { Route, Routes } from 'react-router-dom'
import Login from '../login/Login'

const Main = () => {
  return (
     
      <div className='main'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/card' element={<Card />}/>
        </Routes>
    </div>
  )
}

export default Main
