'use client'

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'

const getPageTitle = (pathname, params) => {
  const staticTitles = {
    '/': 'Random Quotes',
    '/search': 'Search Quotes',
    '/quotes/create': 'Create Quote',
  }

  if (staticTitles[pathname]) {
    return staticTitles[pathname]
  }

  if (pathname === `/quotes/${params.id}/edit`) {
    return `Edit Quote #${params.id}`
  }

  if (pathname === `/quotes/${params.id}`) {
    return `Quote #${params.id}`
  }

  return ''
}

export const Navbar = () => {
  const pathname = usePathname()
  const params = useParams()

  const pageTitle = getPageTitle(pathname, params)

  return (
    <nav className="bg-white p-4 shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="pl-8 text-3xl font-bold text-gray-800 dark:text-white">
            Quotes app
          </h1>
        </Link>
        <h1 className="text-2xl text-center dark:text-white">{pageTitle}</h1>
        <div className="pr-8 text-xl space-x-8">
          <Link
            href="/"
            className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
          >
            Random
          </Link>
          <Link
            href="/search"
            className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
          >
            Search
          </Link>
          <Link
            href="/quotes/create"
            className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
          >
            Create new
          </Link>
        </div>
      </div>
    </nav>
  )
}