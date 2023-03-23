import VariableInp from '@/components/Input/VariableInp'
import AddVariable from '@/components/Input/AddVariable'

const Variables = ({variables, setVariables}) => {
    const toggleTruth = (varName) => {
        setVariables(prev => ({
            ...prev,
            [varName]: !prev[varName]
        }))
    }
    const changeVarName = (prevVarName, newVarName, errCb) => {
        if (prevVarName != newVarName && !(newVarName in variables)) {
            const newVars = Object.keys(variables).reduce((obj, key) => {
                if (key == prevVarName) {
                    obj[newVarName] = variables[prevVarName]
                } else {
                    obj[key] = variables[key]
                }
                return obj;
            }, {});

            setVariables(newVars)
        } else if (prevVarName == newVarName) {
            // Do nothing
        } else {
            // if variable is already present
            if (errCb) {
                errCb()
            }
        }
    }
    const addVar = (varName, successCb, errCb) => {
        if (varName in variables) {
            // if variable is already present
            if (errCb) {
                errCb()
            }
        } else {
            setVariables(prev => ({
                ...prev,
                [varName]: false
            }))
            if (successCb) {
                successCb()
            }
        }
    }
    const deleteVariable = (varName) => {
        const tempVars = {...variables}
        delete tempVars[varName];

        setVariables(tempVars)
    }

    return (
        <div className='bg-slate-800 p-4 h-full text-slate-200'>
            <h2>My variables</h2>
            {variables && <div className='py-4 flex flex-col gap-2'>
                {Object.keys(variables).map((varName, i) => <VariableInp key={i} name={varName} val={variables[varName]} toggleTruth={() => toggleTruth(varName)} onNameChanged={changeVarName} deleteVariable={() => deleteVariable(varName)}/>)}
            </div>}
            <div className="p4">
                <AddVariable onAdddingName={addVar} />
            </div>
        </div>
    )
}

export default Variables