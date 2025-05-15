export default function Button({ onClick, children }) {
  return (
    <div className="text-center m-6" onClick={onClick}>
      <button className="px-4 py-2 text-xl cursor-pointer bg-violet-500 text-white rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600">
        {children}
      </button>
    </div>
  )
}
