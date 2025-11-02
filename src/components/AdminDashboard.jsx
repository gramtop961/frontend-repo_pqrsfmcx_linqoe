import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function AdminDashboard() {
  const [token, setToken] = useState('')
  const [authed, setAuthed] = useState(false)
  const [products, setProducts] = useState([])
  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', price: 0, category: 'home', in_stock: true, image_url: '' })

  const headers = authed ? { 'Content-Type': 'application/json', 'X-Admin-Token': token } : {}

  const loadAll = async () => {
    if (!authed) return
    setLoading(true)
    try {
      const [pRes, bRes] = await Promise.all([
        fetch(`${API}/admin/products`, { headers }),
        fetch(`${API}/admin/business`, { headers })
      ])
      if (pRes.ok) setProducts(await pRes.json())
      if (bRes.ok) setBusiness(await bRes.json())
    } finally {
      setLoading(false)
    }
  }

  const attemptAuth = async () => {
    // simple probe call
    const res = await fetch(`${API}/admin/products`, { headers: { 'X-Admin-Token': token } })
    setAuthed(res.ok)
    if (!res.ok) alert('Invalid token')
  }

  useEffect(() => { if (authed) loadAll() }, [authed])

  const saveBusiness = async () => {
    const res = await fetch(`${API}/admin/business`, { method: 'PUT', headers, body: JSON.stringify(business) })
    if (!res.ok) alert('Failed to save business')
  }

  const addProduct = async () => {
    const res = await fetch(`${API}/admin/products`, { method: 'POST', headers, body: JSON.stringify(form) })
    if (res.ok) {
      setForm({ title: '', description: '', price: 0, category: 'home', in_stock: true, image_url: '' })
      loadAll()
    } else {
      alert('Failed to add product')
    }
  }

  const updateProduct = async (id, data) => {
    const res = await fetch(`${API}/admin/products/${id}`, { method: 'PUT', headers, body: JSON.stringify(data) })
    if (!res.ok) alert('Update failed')
  }

  const deleteProduct = async (id) => {
    const res = await fetch(`${API}/admin/products/${id}`, { method: 'DELETE', headers })
    if (res.ok) setProducts(products.filter(p => p.id !== id))
  }

  if (!authed) {
    return (
      <section className="max-w-md mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-3">Admin Dashboard</h2>
        <p className="text-gray-600 mb-4">Enter your secure admin token to manage products and business details.</p>
        <div className="bg-white border rounded-lg p-6 flex gap-2">
          <input className="flex-1 border rounded px-3 py-2" placeholder="Admin token" value={token} onChange={e => setToken(e.target.value)} />
          <button onClick={attemptAuth} className="bg-blue-600 text-white px-4 rounded">Enter</button>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-3">Products</h3>
          <div className="bg-white border rounded-lg p-4 mb-6 grid md:grid-cols-2 gap-4">
            <input className="border rounded px-3 py-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
            <input className="border rounded px-3 py-2" placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})} />
            <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} />
            <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
            <div className="flex items-center gap-3">
              <select className="border rounded px-3 py-2" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                <option value="home">Home</option>
                <option value="ink">Ink</option>
                <option value="other">Other</option>
              </select>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.in_stock} onChange={e=>setForm({...form,in_stock:e.target.checked})} /> In Stock</label>
            </div>
            <div>
              <button onClick={addProduct} className="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {products.map(p => (
              <div key={p.id} className="border rounded-lg p-4 bg-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{p.title}</h4>
                    <p className="text-sm text-gray-600">₹{p.price}</p>
                    <p className="text-xs mt-1">{p.category} {p.in_stock ? '• In Stock' : '• Out of Stock'}</p>
                  </div>
                  <button onClick={()=>deleteProduct(p.id)} className="text-red-600 text-sm">Delete</button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <button onClick={()=>updateProduct(p.id,{...p,in_stock:!p.in_stock})} className="border rounded px-3 py-1">Toggle Stock</button>
                  <button onClick={()=>updateProduct(p.id,{...p,category: p.category==='ink'?'home':'ink'})} className="border rounded px-3 py-1">Toggle Category</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Business Details</h3>
          <div className="bg-white border rounded-lg p-4 grid gap-3">
            <input className="border rounded px-3 py-2" placeholder="Business Name" value={business?.name || ''} onChange={e=>setBusiness({...business, name:e.target.value})} />
            <input className="border rounded px-3 py-2" placeholder="Business Email" value={business?.email || ''} onChange={e=>setBusiness({...business, email:e.target.value})} />
            <input className="border rounded px-3 py-2" placeholder="Phone" value={business?.phone || ''} onChange={e=>setBusiness({...business, phone:e.target.value})} />
            <input className="border rounded px-3 py-2" placeholder="Address Line 1" value={business?.address_line1 || ''} onChange={e=>setBusiness({...business, address_line1:e.target.value})} />
            <input className="border rounded px-3 py-2" placeholder="Address Line 2" value={business?.address_line2 || ''} onChange={e=>setBusiness({...business, address_line2:e.target.value})} />
            <div className="grid grid-cols-2 gap-2">
              <input className="border rounded px-3 py-2" placeholder="City" value={business?.city || ''} onChange={e=>setBusiness({...business, city:e.target.value})} />
              <input className="border rounded px-3 py-2" placeholder="State" value={business?.state || ''} onChange={e=>setBusiness({...business, state:e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input className="border rounded px-3 py-2" placeholder="Postal Code" value={business?.postal_code || ''} onChange={e=>setBusiness({...business, postal_code:e.target.value})} />
              <input className="border rounded px-3 py-2" placeholder="Country" value={business?.country || ''} onChange={e=>setBusiness({...business, country:e.target.value})} />
            </div>
            <button onClick={saveBusiness} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </div>
      </div>
      {loading && <p className="mt-4 text-sm">Loading...</p>}
    </section>
  )
}
