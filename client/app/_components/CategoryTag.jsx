import Link from 'next/link'

export const CategoryTag = ({
  category,
  selectedCategory,
  isSingleQuotePage,
}) => {
  const styleSingle =
    'text-base bg-blue-200 hover:bg-blue-300  px-4 py-1 rounded-lg'
  const styleMultiple = `${
    category === selectedCategory ? `bg-yellow-200 hover:bg-yellow-300` : `bg-blue-200 hover:bg-blue-300`
  } text-sm px-3 py-1 rounded-full`

  const classes = isSingleQuotePage ? styleSingle : styleMultiple

  return (
    <Link href={`/search?category=${category}`} className={`${classes} text-gray-700 transition-colors 400`}>
      {category}
    </Link>
  )
}
