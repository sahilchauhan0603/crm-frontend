import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">📊 Mini CRM Platform</h1>
        <p className="text-center text-gray-600">Customer Segmentation & Campaign Management</p>
      </header>

      <main className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
        <p className="mb-4">
          This is the starting point of your CRM app. You can start building the following modules:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>🔐 Google OAuth Login</li>
          <li>👥 Audience Segment Builder</li>
          <li>📨 Campaign Creator</li>
          <li>📈 Campaign History and Insights</li>
          <li>🧠 AI Features</li>
        </ul>

        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
