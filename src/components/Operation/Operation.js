import BoolToogleButton from '@/components/Button/BoolToogleButton.js'
import VariableDropdown from '@/components/Dropdown/VariableDropdown.js'
import WithDelButton from '@/components/WithDelButton.js'
import DelButton from '@/components/Button/DelButton'

const createOperand = (operand, variables, ops, results, updateConstant, rootUpdateConstant, updateVar, rootUpdateVar, delOp, parentkey) => {
    if (operand.val?.toString()) {
        return <WithDelButton>
            <BoolToogleButton isTrue={operand.val} setIsTrue={(val) => updateConstant(operand.id, val)} />
        </WithDelButton>
    } else if (operand.arg) {
        return <WithDelButton>
            <VariableDropdown variableName={operand.arg} isTrue={variables[operand.arg]} options={variables} updateArg={(val) => updateVar(operand.id, val)} />
        </WithDelButton>
    } else if (operand.op) {
        return <Operation operatorKey={operand.op} {...ops[operand.op]} ops={ops} variables={variables} result={results[operand.op]} results={results} updateConstant={rootUpdateConstant} updateVar={rootUpdateVar} delOp={delOp} parentkey={parentkey}/>
    }
}

const Operation = ({ operator, operands, ...props }) => {
    return (
        <div className={`border-l-2 ${props.result ? 'border-green-700 hover:border-green-500' : 'border-red-700 hover:border-red-500'} ml-2 my-2 pl-2 text-slate-100 w-28`}>
            <div className={`font-bold flex gap-2 w-max ${props.result ? 'text-green-500' : 'text-red-500'}`}><div><span className='uppercase'>{operator}</span> | <span className='capitalize'>{props.result.toString()}</span></div> <DelButton onClick={() => props.delOp(props.parentkey, props.operatorKey)} /></div>
            {operands.map(operand => <div key={operand.id} className='p-1'>{createOperand(operand, props.variables, props.ops, props.results, (operandId, val) => props.updateConstant(props.operatorKey, operandId, val), props.updateConstant, (operandId, val) => props.updateVar(props.operatorKey, operandId, val), props.updateVar, props.delOp, props.operatorKey)}</div>)}
        </div>
    )
}

export default Operation