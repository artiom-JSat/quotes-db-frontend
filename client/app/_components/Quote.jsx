import Link from 'next/link'
import { CategoryTags } from '@components/CategoryTags'

const MAX_VISIBLE_TEXT_LENGTH = 200

function highlightText(text, searchText) {
  if (!searchText || searchText.length < 3) return text

  const parts = text.split(new RegExp(`(${searchText})`, 'gi'))
  return parts.map((part, index) =>
    part.toLowerCase() === searchText.toLowerCase() ? (
      <span key={index} className="bg-yellow-200 dark:text-gray-700 py-1">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

export const Quote = ({ quote, selectedCategory, searchText }) => {
  const quoteText =
    quote.text.length > MAX_VISIBLE_TEXT_LENGTH
      ? `${quote.text.slice(0, MAX_VISIBLE_TEXT_LENGTH)}...`
      : quote.text

  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:-translate-y-1.5 transition-transform duration-300">
      <Link href={`/quotes/${quote.id}`}>
        <p className="mb-4 text-lg italic text-gray-900 dark:text-gray-100 hover:underline">
          &quot;
          {highlightText(quoteText, searchText)}
          &quot;
        </p>
      </Link>
      <Link href={`/search?author=${quote.author}`}>
        <p className="mb-10 text-right font-semibold text-gray-700 dark:text-gray-300">
          — <span className="hover:underline">{quote.author}</span>
        </p>
      </Link>
      <CategoryTags
        categories={quote.categories}
        selectedCategory={selectedCategory}
      />
    </div>
  )
}
