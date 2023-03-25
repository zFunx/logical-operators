import { useState } from 'react';

import BoolCheckbox from '@/components/BoolCheckbox'
import Popup from '@/components/Dropdown/Popup'

const VariableDropdown = props => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev)

    return (
        <div className={`${props.isTrue ? 'bg-green-700/20' : 'bg-red-700/20'} relative p-2 w-max rounded-md flex justify-between cursor-pointer gap-2`} onClick={toggleDropdown}>
            Arg: {props.variableName}
            <BoolCheckbox isTrue={props.isTrue} />
            {isDropdownOpen && <Popup options={Object.keys(props.options)} handleOptionClick={props.updateArg}/>}
        </div>
    )
}

export default VariableDropdown