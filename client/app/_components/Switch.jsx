'use client'

import React from 'react'
import { Sun, Moon } from 'lucide-react'

export const Switch = ({ checked = false, onChange = () => {} }) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      className={`cursor-pointer relative inline-flex h-8 w-13 items-center rounded-full transition-colors ${
        checked ? 'bg-violet-800' : 'bg-yellow-400'
      }`}
    >
      <span
        className={`inline-flex items-center justify-center h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      >
        {checked ? (
          <Moon className="h-4 w-4 text-violet-800" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-500" />
        )}
      </span>
    </button>
  )
}
