const Quote = ({ quote }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg">
      <p className="mb-4 text-lg italic text-gray-900  dark:text-gray-100">
        &quot;{quote.text}&quot;
      </p>
      <p className="mb-10 text-right font-semibold text-gray-700  dark:text-gray-300">
        — {quote.author}
      </p>
      <div className="flex flex-wrap mt-2">
        {quote.categories.map((category) => (
          <span
            key={category}
            className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full mr-2 mb-2"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Quote
