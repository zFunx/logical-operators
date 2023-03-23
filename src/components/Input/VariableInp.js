import { useState } from "react";
import { PropTypes } from "prop-types"

import BoolCheckbox from '@/components/BoolCheckbox'

const VariableInp = props => {
    const [isErr, setIsErr] = useState(false);
    const [invalidErr, setIsInvalidErr] = useState('');

    const onNameChanged = (e) => {
        setIsErr(false)
        const varName = e.target.value

        // Check if first character is letter
        const firstChar = varName.charAt(0);
        const isFirstCharLetter = /^[a-zA-Z]$/.test(firstChar);
        if (!isFirstCharLetter) {
            setIsInvalidErr('Variable must begin with a letter.')
            return
        } else {
            setIsInvalidErr('')
        }
        
        if (props.onNameChanged) {
            props.onNameChanged(props.name, varName, () => setIsErr(true))
        }
    }

    return (
        <div className={isErr || invalidErr ? 'mb-3' : ''}>
            <div className='p-2 bg-slate-700 rounded-md flex'>
                <input className='bg-transparent outline-none flex-1' type="text" defaultValue={props.name} onChange={onNameChanged} />
                <BoolCheckbox isTrue={props.val} toggleTruth={props.toggleTruth} />
            </div>
            {isErr && <small className="text-red-400">Variable is already present. </small>}
            {invalidErr && <small className="text-red-400">{invalidErr} </small>}
            {(isErr || invalidErr) && <small className="text-red-400">This variable will be evaluated with name <strong>{props.name}</strong></small>}
        </div>
    )
}

VariableInp.propTypes = {
    name: PropTypes.string.isRequired,
    val: PropTypes.bool.isRequired,
    toggleTruth: PropTypes.func,
    onNameChanged: PropTypes.func,
}

export default VariableInp