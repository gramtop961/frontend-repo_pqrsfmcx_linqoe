import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function InkOrderForm() {
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    color: 'Red',
    quantity_liters: 1,
    delivery_address: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'quantity_liters' ? Number(value) : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      const res = await fetch(`${API}/orders/ink`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to submit order')
      const data = await res.json()
      if (data.email === 'not_configured') {
        setStatus('Order received. Email notifications are not yet configured by the business.')
      } else {
        setStatus('Order placed successfully! A confirmation has been emailed to the business.')
      }
      setForm({ customer_name: '', customer_email: '', customer_phone: '', color: 'Red', quantity_liters: 1, delivery_address: '', message: '' })
    } catch (e) {
      setStatus(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="ink-order" className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-2">Order Red or Blue Ink</h2>
      <p className="text-gray-600 mb-6">Fill out the form and we will process your order immediately.</p>
      <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Your Name</label>
            <input required name="customer_name" value={form.customer_name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input required type="email" name="customer_email" value={form.customer_email} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input name="customer_phone" value={form.customer_phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Color</label>
            <select name="color" value={form.color} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option>Red</option>
              <option>Blue</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Quantity (Liters)</label>
            <input type="number" min={0.1} step={0.1} name="quantity_liters" value={form.quantity_liters} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Delivery Address</label>
            <input name="delivery_address" value={form.delivery_address} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={3} />
        </div>
        <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-60">
          {loading ? 'Submitting...' : 'Submit Order'}
        </button>
        {status && <p className="text-sm text-gray-700">{status}</p>}
      </form>
    </section>
  )
}
