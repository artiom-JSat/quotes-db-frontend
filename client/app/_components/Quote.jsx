import Link from 'next/link'
import { CategoryTags } from '@components/CategoryTags'

const MAX_VISIBLE_TEXT_LENGTH = 200

export const Quote = ({ quote, selectedCategory }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:-translate-y-1.5 transition-transform duration-300">
      <Link href={`/quotes/${quote.id}`}>
        <p className="mb-4 text-lg italic text-gray-900 dark:text-gray-100">
          &quot;
          {quote.text.length > MAX_VISIBLE_TEXT_LENGTH
            ? `${quote.text.slice(0, MAX_VISIBLE_TEXT_LENGTH)}...`
            : quote.text}
          &quot;
        </p>
        <p className="mb-10 text-right font-semibold text-gray-700 dark:text-gray-300">
          — {quote.author}
        </p>
      </Link>
      <CategoryTags categories={quote.categories} selectedCategory={selectedCategory} />
    </div>
  )
}
