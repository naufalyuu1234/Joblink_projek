import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/useTheme'
import HomePage from './page/user/home'
import LoginPage from './page/auth/login'
import RegisterPage from './page/auth/register'
import AssistantPage from './page/user/assistant'
import SearchPages from './page/user/search-pages'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/assistant' element={<AssistantPage/>}/>
          <Route path='/jobs' element={<SearchPages/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
