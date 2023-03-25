import BoolToogleButton from '@/components/Button/BoolToogleButton.js'
import VariableDropdown from '@/components/Dropdown/VariableDropdown.js'

const createOperand = (operand, variables, ops, results, updateConstant, rootUpdateConstant, updateVar, rootUpdateVar) => {
    if (operand.val?.toString()) {
        return <BoolToogleButton isTrue={operand.val} setIsTrue={(val) => updateConstant(operand.id, val)} />
    } else if (operand.arg) {
        return <VariableDropdown variableName={operand.arg} isTrue={variables[operand.arg]} options={variables} updateArg={(val) => updateVar(operand.id, val)} />
    } else if (operand.op) {
        return <Operation operatorKey={operand.op} {...ops[operand.op]} ops={ops} variables={variables} result={results[operand.op]} results={results} updateConstant={rootUpdateConstant} updateVar={rootUpdateVar}/>
    }
}

const Operation = ({ operator, operands, ...props }) => {
    return (
        <div className={`border-l-2 ${props.result ? 'border-green-700 hover:border-green-500' : 'border-red-700 hover:border-red-500'} ml-2 my-2 pl-2 text-slate-100 w-28`}>
            <div className={`font-bold ${props.result ? 'text-green-500' : 'text-red-500'}`}><span className='uppercase'>{operator}</span> | <span className='capitalize'>{props.result.toString()}</span></div>
            {operands.map(operand => <div key={operand.id} className='p-1'>{createOperand(operand, props.variables, props.ops, props.results, (operandId, val) => props.updateConstant(props.operatorKey, operandId, val), props.updateConstant, (operandId, val) => props.updateVar(props.operatorKey, operandId, val), props.updateVar)}</div>)}
        </div>
    )
}

export default Operation