import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/useTheme'
import { AuthProvider } from './context/AuthContext'
import HomePage from './page/user/home'
import AssistantPage from './page/user/assistant'
import LoginPage from './page/auth/login'
import RegisterPage from './page/auth/register'
import SearchPages from './page/user/search-pages'
import Profile from './page/user/profile' 
import Compani from './page/user/compani'
import JobDetail from './page/user/detail'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<SearchPages />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/companies" element={<Compani />} />
            <Route path="/detail/:id" element={<JobDetail/>} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
