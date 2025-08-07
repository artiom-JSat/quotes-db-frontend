'use client'

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { useState } from 'react'
import { AppIcon } from '@shared/appIcon'
import { MenuIcon } from '@shared/menuIcon'
import { ToggleTheme } from '@components/ToggleTheme'

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
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const params = useParams()

  const pageTitle = getPageTitle(pathname, params)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const MenuButton = () => (
    <button
      onClick={toggleMenu}
      className="ml-auto text-gray-800 dark:text-white focus:outline-none md:hidden"
    >
      <MenuIcon isOpen={isOpen} />
    </button>
  )

  const menuItems = [
    { href: '/', text: 'Random' },
    { href: '/search', text: 'Search' },
    { href: '/quotes/create', text: 'Create New' },
  ]

  return (
    <nav className="bg-white dark:bg-gray-800 py-4 px-8 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 -m-1">
          <AppIcon alt="Quotes App icon" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Quotes app
          </h1>
        </Link>
        <h1 className="hidden xl:block absolute left-1/2 transform -translate-x-1/2 text-xl lg:text-2xl text-gray-800 dark:text-white">
          {pageTitle}
        </h1>

        {/* Hamburger Button for Mobile Menu */}
        <MenuButton />

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-3/4 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-500 ease-in-out z-40 bg-gradient-to-r from-transparent to-white dark:from-transparent dark:to-gray-800`}
        >
          <div className="flex flex-col pt-5 pr-8 items-end justify-center space-y-4 text-2xl">
            <MenuButton />
            {menuItems.map((menuItem) => (
              <Link
                key={menuItem.text}
                href={menuItem.href}
                className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                {menuItem.text}
              </Link>
            ))}
            <ToggleTheme />
          </div>
        </div>

        {/* Background Overlay for Mobile Menu */}
        {
          <div
            className={`${
              isOpen ? 'opacity-80 w-full' : 'opacity-0 w-0'
            } transition-all duration-500 fixed h-full top-0 right-0 bg-black md:hidden`}
            onClick={toggleMenu}
          />
        }

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-xl">
          <MenuButton />
          {menuItems.map((menuItem) => (
            <Link
              key={menuItem.text}
              href={menuItem.href}
              className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
            >
              {menuItem.text}
            </Link>
          ))}
          <ToggleTheme />
        </div>
      </div>
    </nav>
  )
}
