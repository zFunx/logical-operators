import { useState } from "react";
import BoolCheckbox from '@/components/BoolCheckbox'

const VariableInp = () => {
    const [isTrue, setIsTrue] = useState(false);
    const toggleTruth = () => setIsTrue(prev => !prev)

    return (
        <div className='p-2 bg-slate-700 rounded-md flex'>
            <input className='bg-transparent outline-none' type="text" />
            <BoolCheckbox isTrue={isTrue} toggleTruth={toggleTruth} />
        </div>
    )
}

export default VariableInp