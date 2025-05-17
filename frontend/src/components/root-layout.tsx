import { Outlet } from "@tanstack/react-router"
import Header from "./header"

export default function RootLayout() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </>
  )
}
