import BoolCheckbox from '@/components/BoolCheckbox'

const VariableDropdown = props => {
    return (
        <div className={`${props.isTrue ? 'bg-green-700/20' : 'bg-red-700/20'} p-2 w-max rounded-md flex justify-between cursor-pointer gap-2`}>
            Arg: {props.variableName}
            <BoolCheckbox isTrue={props.isTrue} />
        </div>
    )
}

export default VariableDropdown