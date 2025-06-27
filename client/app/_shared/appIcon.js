import { Zilla_Slab } from 'next/font/google'

const zillaSlab = Zilla_Slab({
  weight: '700',
  style: 'normal',
  subsets: ['latin'],
})

export const AppIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0" y="0" width="64" height="64" rx="12" fill="oklch(43.2% 0.232 292.759)" />
    <text
      x="10"
      y="46"
      fontSize="50"
      fill="white"
      className={zillaSlab.className}
    >
      “_
    </text>
  </svg>
)
