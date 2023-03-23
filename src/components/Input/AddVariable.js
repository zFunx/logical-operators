import { useState } from "react";
import PropTypes from 'prop-types'

const AddVariable = props => {
    const [isErr, setIsErr] = useState(false);
    const [name, setName] = useState('');
    const onNameChanged = (event) => {
        setIsErr(false)
        setName(event.target.value);
    }
    const onAdddingName = () => {
        props.onAdddingName(name, () => setName(''), () => setIsErr(true))
    }

    return (
        <div>
            <div className='bg-slate-700 rounded-md flex overflow-hidden'>
                <input className='bg-transparent outline-none m-2' type="text" placeholder="Variable name" value={name} onChange={onNameChanged} />
                <button onClick={onAdddingName} className="bg-neutral-50/70 text-black px-2 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!name}>Add</button>
            </div>
            {isErr && <small className="text-red-400">Variable is already present</small>}
        </div>
    )
}

AddVariable.propTypes = {
    onAdddingName: PropTypes.func.isRequired
}

export default AddVariable