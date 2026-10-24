import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Layout from './components/layout/Layout.jsx'
import DiscoverPage from './pages/DiscoverPage.jsx'
import ChatLabPage from './pages/ChatLabPage.jsx'
import CreationsPage from './pages/CreationsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DiscoverPage />} />
          <Route path="lab" element={<Navigate to="/lab/new" replace />} />
          <Route path="lab/new" element={<ChatLabPage />} />
          <Route path="lab/:id" element={<ChatLabPage />} />
          <Route path="creations" element={<CreationsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
