import { useState } from 'react';
import Proptypes from 'prop-types'

import Popup from '@/components/Dropdown/Popup'

const Dropdown = ({ label, options, ...props }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toogleDropdown = () => setIsDropdownOpen(prev => !prev)

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
    };

    return (
        <div className="relative" onClick={toogleDropdown}>
            <button className={`${isDropdownOpen ? 'shadow-border' : ''} bg-gray-300 text-gray-700 font-semibold py-1 px-3 text-sm rounded-full`}>
                {label}
            </button>
            {isDropdownOpen && <Popup options={options} handleOptionClick={handleOptionClick} />}
        </div>
    );
};

Dropdown.proptypes = {
    options: Proptypes.arrayOf(Proptypes.string),
    label: Proptypes.string,
}

export default Dropdown;