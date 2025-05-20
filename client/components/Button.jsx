export default function Button({ onClick, children, variant = 'primary' }) {
  const baseClasses =
    'px-4 py-2 text-xl rounded-md cursor-pointer hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-opacity-50'
  const variantClasses =
    variant === 'primary'
      ? 'bg-violet-800 text-white focus:ring-violet-600 hover:bg-violet-900'
      : 'bg-gray-300 text-gray-800 focus:ring-gray-500 hover:bg-gray-400'

  return (
    <div className="text-center m-2">
      <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
        {children}
      </button>
    </div>
  )
}
