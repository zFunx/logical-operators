import { useState } from "react";

import VariableInp from '@/components/Input/VariableInp'

const Variables = () => {
    const [variables, setVariables] = useState({
        'My Arg': false,
    })
    const setTruth = (varName, val) => {

    }

    return (
        <div className='bg-slate-800 p-4 h-full text-slate-200'>
            <h2>My variables</h2>
            <div className='py-4'>
                {Object.keys(variables).map(varName => <VariableInp key={varName} name={varName} val={variables[varName]} />)}
            </div>
        </div>
    )
}

export default Variables