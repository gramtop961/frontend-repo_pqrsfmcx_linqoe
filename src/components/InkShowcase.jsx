export default function InkShowcase() {
  return (
    <section className="bg-gradient-to-r from-red-50 to-blue-50 border-y">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold">Premium Red & Blue Inks</h2>
          <p className="mt-3 text-gray-600">High-quality pigment inks suitable for stationery, schools, and industrial use. Order directly and receive instant confirmation via email.</p>
          <ul className="mt-4 text-sm list-disc pl-5 text-gray-700 space-y-1">
            <li>Consistent color density</li>
            <li>Fast-drying, smudge-resistant</li>
            <li>Custom bulk quantities available</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border bg-white p-4 text-center">
            <div className="h-24 rounded mb-3" style={{background: 'linear-gradient(180deg,#fca5a5,#ef4444)'}} />
            <h3 className="font-semibold">Red Ink</h3>
            <p className="text-sm text-gray-600">Vibrant, bold red for clear markings.</p>
          </div>
          <div className="rounded-lg border bg-white p-4 text-center">
            <div className="h-24 rounded mb-3" style={{background: 'linear-gradient(180deg,#93c5fd,#2563eb)'}} />
            <h3 className="font-semibold">Blue Ink</h3>
            <p className="text-sm text-gray-600">Classic blue with excellent readability.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
