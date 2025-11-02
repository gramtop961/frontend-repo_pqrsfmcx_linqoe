import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function Catalogue() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/products`)
        if (!res.ok) throw new Error('Failed to load products')
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">Catalogue</h2>
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, idx) => (
          <article key={idx} className="border rounded-lg overflow-hidden bg-white shadow-sm">
            {p.image_url && (
              <img src={p.image_url} alt={p.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              {p.category && (
                <span className="inline-block text-xs bg-gray-100 px-2 py-0.5 rounded mt-1">{p.category}</span>
              )}
              {p.description && <p className="text-sm text-gray-600 mt-2 line-clamp-3">{p.description}</p>}
              <div className="mt-3 flex items-center justify-between">
                <span className="font-bold">₹{p.price?.toFixed ? p.price.toFixed(2) : p.price}</span>
                <button className={`px-3 py-1.5 rounded-md text-sm ${p.in_stock ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`} disabled={!p.in_stock}>
                  {p.in_stock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
