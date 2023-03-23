import { PropTypes } from "prop-types"

import BoolCheckbox from '@/components/BoolCheckbox'

const VariableInp = props => {
    return (
        <div className='p-2 bg-slate-700 rounded-md flex'>
            <input className='bg-transparent outline-none flex-1' type="text" defaultValue={props.name} />
            <BoolCheckbox isTrue={props.val} toggleTruth={props.toggleTruth} />
        </div>
    )
}

VariableInp.propTypes = {
    name: PropTypes.string.isRequired,
    val: PropTypes.bool.isRequired,
    toggleTruth: PropTypes.func
}

export default VariableInp