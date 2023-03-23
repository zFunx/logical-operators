const createOperand = (operand, variables, ops) => {
    if (typeof operand == "boolean") {
        return <div>true | false</div>
    } else if (operand.arg) {
        return <div>Arg: {variables[operand.arg].toString()}</div>
    } else if (operand.op) {
        return <Operation operator={ops[operand.op].operator} operands={ops[operand.op].operands} variables={variables} ops={ops} />
    }
}

const Operation = ({ operator, operands, ...props }) => {
    return (
        <div className="border-l-2 border-slate-700 hover:border-slate-500 ml-2 my-2 px-2 text-slate-100">
            <div className="font-bold ">{operator}</div>
            {operands.map(operand => createOperand(operand, props.variables, props.ops))}
        </div>
    )
}

export default Operation