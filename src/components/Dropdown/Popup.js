const Popup = ({ options, handleOptionClick }) => {
    return (
        <>
            <div className="fixed inset-0 z-10"></div>
            <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-md shadow z-20 overflow-hidden">
                {options.map((option) => (
                    <button
                        key={option}
                        type="button"
                        className="px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </>
    )
}

export default Popup