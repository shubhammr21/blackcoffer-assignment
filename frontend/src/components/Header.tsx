import { Link } from "@tanstack/react-router"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">
          <Link to="/">Data Visualization Dashboard</Link>
        </h1>
      </div>
    </header>
  )
}
