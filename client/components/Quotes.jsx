import Quote from "./Quote"

const Quotes = ({ quotes }) => {
  return (
    <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotes.map((quote) => (
        <Quote key={quote.id} quote={quote} />
      ))}
    </div>
  )
}

export default Quotes
