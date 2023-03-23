import { useState } from 'react';
import Proptypes from 'prop-types'

const Dropdown = ({ label, options }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleOptionClick = (option) => {
        // setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative">
            <button
                type="button"
                className="bg-gray-300 text-gray-700 font-semibold py-1 px-3 text-sm rounded-full inline-flex items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                {label}
            </button>
            {isDropdownOpen && (
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
            )}
        </div>
    );
};

Dropdown.proptypes = {
    options: Proptypes.arrayOf(Proptypes.string),
    label: Proptypes.string,
}

export default Dropdown;