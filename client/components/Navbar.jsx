import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className="bg-white p-4 shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
        <h1 className="pl-8 text-3xl font-bold text-gray-800 dark:text-white">
          Quotes app
        </h1>
        </Link>
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
        </div>
      </div>
    </nav>
  )
}

export default NavBar
