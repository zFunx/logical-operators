import BoolToogleButton from '@/components/Button/BoolToogleButton.js'

const createOperand = (operand, variables, ops) => {
    if (operand.val?.toString()) {
        return <BoolToogleButton />
    } else if (operand.arg) {
        return <div>Arg: {variables[operand.arg].toString()}</div>
    } else if (operand.op) {
        return <Operation operator={ops[operand.op].operator} operands={ops[operand.op].operands} variables={variables} ops={ops} />
    }
}

const Operation = ({ operator, operands, ...props }) => {
    return (
        <div className="border-l-2 border-slate-700 hover:border-slate-500 ml-2 my-2 pl-2 text-slate-100 w-28">
            <div className="font-bold ">{operator}</div>
            {operands.map(operand => <div key={operand.id} className='p-1'>{createOperand(operand, props.variables, props.ops)}</div>)}
        </div>
    )
}

export default Operation