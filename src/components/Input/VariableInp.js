import { useState } from "react";
import { PropTypes } from "prop-types"

import BoolCheckbox from '@/components/BoolCheckbox'

const VariableInp = props => {
    const [isTrue, setIsTrue] = useState(false);
    const toggleTruth = () => setIsTrue(prev => !prev)

    return (
        <div className='p-2 bg-slate-700 rounded-md flex'>
            <input className='bg-transparent outline-none' type="text" defaultValue={props.name} />
            <BoolCheckbox isTrue={props.val} toggleTruth={toggleTruth} />
        </div>
    )
}

VariableInp.propTypes = {
    name: PropTypes.string.isRequired,
    val: PropTypes.bool.isRequired
}

export default VariableInp