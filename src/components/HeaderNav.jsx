import { ShoppingBag, Settings } from 'lucide-react'

export default function HeaderNav({ onNavigate, active }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-blue-600" />
          <span className="font-semibold text-lg">Laxmi Enterprise</span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <button onClick={() => onNavigate('shop')} className={`px-3 py-1.5 rounded-md ${active==='shop' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>Shop</button>
          <button onClick={() => onNavigate('ink')} className={`px-3 py-1.5 rounded-md ${active==='ink' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>Red & Blue Inks</button>
          <button onClick={() => onNavigate('admin')} className={`px-3 py-1.5 rounded-md flex items-center gap-1 ${active==='admin' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
            <Settings className="w-4 h-4" /> Admin
          </button>
        </nav>
      </div>
    </header>
  )
}
