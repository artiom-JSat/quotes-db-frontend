export const InputField = ({ placeholder, value, onChange, error, showError }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputStyle}
      />
      {showError && error && <p className={errorStyle}>{error}</p>}
    </div>
  )
}

export const inputStyle =
  'w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white'

export const errorStyle = 'text-red-500 text-sm absolute'
