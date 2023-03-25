import { useState } from 'react';
import Proptypes from 'prop-types'

import Popup from '@/components/Dropdown/Popup'

const Dropdown = ({ label, options, ...props }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleOptionClick = (option) => {
        switch (option) {
            case 'Constant':
                props.createConstant();
                break;
            case 'Argument':
                props.createArg();
                break;
            case 'OR':
                props.createOp('or');
                break;
            case 'AND':
                props.createOp('and');
                break;
        }
        // setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <button
                type="button"
                className="bg-gray-300 text-gray-700 font-semibold py-1 px-3 text-sm rounded-full inline-flex items-center"

            >
                {label}
            </button>
            {isDropdownOpen && (
                // <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl">
                //     {options.map((option) => (
                //         <button
                //             key={option}
                //             type="button"
                //             className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                //             onClick={() => handleOptionClick(option)}
                //         >
                //             {option}
                //         </button>
                //     ))}
                // </div>
                <Popup options={options} handleOptionClick={handleOptionClick} />
            )}
        </div>
    );
};

Dropdown.proptypes = {
    options: Proptypes.arrayOf(Proptypes.string),
    label: Proptypes.string,
}

export default Dropdown;