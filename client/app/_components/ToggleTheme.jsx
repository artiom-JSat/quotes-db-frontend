'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Switch } from '@components/Switch'

export const ToggleTheme = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isDark}
        onChange={(val) => setTheme(val ? 'dark' : 'light')}
      />
    </div>
  )
}
