const Popup = ({options}) => {
    return (
        <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    onClick={() => handleOptionClick(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    )
}

export default Popup