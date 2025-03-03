import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './page/user/home'
import LoginPage from './page/auth/login'
import RegisterPage from './page/auth/register'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}
