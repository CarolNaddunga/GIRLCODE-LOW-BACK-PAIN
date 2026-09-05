import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewAssessment from './pages/NewAssessment'
import Upload from './pages/Upload'
import Analyzing from './pages/Analyzing'
import Results from './pages/Results'
import Recommendations from './pages/Recommendations'
import Exercise from './pages/Exercise'
import ProgressPage from './pages/Progress'
import Profile from './pages/Profile'

function Shell({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Shell><Dashboard /></Shell>} />
        <Route path="/assessment" element={<Shell><NewAssessment /></Shell>} />
        <Route path="/assessment/upload" element={<Shell><Upload /></Shell>} />
        <Route path="/assessment/analyzing" element={<Shell><Analyzing /></Shell>} />
        <Route path="/assessment/results" element={<Shell><Results /></Shell>} />
        <Route path="/assessment/recommendations" element={<Shell><Recommendations /></Shell>} />
        <Route path="/exercise" element={<Shell><Exercise /></Shell>} />
        <Route path="/exercises" element={<Shell><Recommendations /></Shell>} />
        <Route path="/progress" element={<Shell><ProgressPage /></Shell>} />
        <Route path="/profile" element={<Shell><Profile /></Shell>} />
      </Routes>
    </BrowserRouter>
  )
}