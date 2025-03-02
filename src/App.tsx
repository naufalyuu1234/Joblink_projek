import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './page/user/home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}
