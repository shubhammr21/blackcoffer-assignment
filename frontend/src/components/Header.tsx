import { Button } from "@/components/ui/button"
import { createLink, Link } from "@tanstack/react-router"

const ButtonLink = createLink(Button)

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            <Link to="/">Data Visualization Dashboard</Link>
          </h1>
          <div className="flex gap-2">
            <ButtonLink
              to="/"
              variant="outline"
              activeProps={{ className: "font-bold", variant: "secondary" }}
            >
              Charts
            </ButtonLink>
            <ButtonLink
              to="/table"
              variant="outline"
              activeProps={{ className: "font-bold", variant: "secondary" }}
            >
              Data Table
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  )
}
