import { useState } from 'react'
import HeaderNav from './components/HeaderNav'
import Catalogue from './components/Catalogue'
import InkShowcase from './components/InkShowcase'
import InkOrderForm from './components/InkOrderForm'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const [view, setView] = useState('shop')

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <HeaderNav active={view} onNavigate={setView} />

      {view === 'shop' && (
        <>
          <InkShowcase />
          <Catalogue />
        </>
      )}

      {view === 'ink' && (
        <>
          <InkShowcase />
          <InkOrderForm />
        </>
      )}

      {view === 'admin' && <AdminDashboard />}

      <footer className="mt-16 border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Laxmi Enterprise</p>
          <p>
            Backend: <code className="bg-gray-100 px-1 rounded">{import.meta.env.VITE_BACKEND_URL}</code>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
