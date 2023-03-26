// Components
import BoolToogleButton from "@/components/Button/BoolToogleButton.js";
import VariableDropdown from "@/components/Dropdown/VariableDropdown.js";
import WithDelButton from "@/components/WithDelButton.js";
import DelButton from "@/components/Button/DelButton";
import Dropdown from "@/components/Dropdown/Dropdown";

const createOperand = ({ operator, operand, operands, ...props }) => {
  if (operand.val?.toString()) {
    const { delArgOrConstant, updateConstant, operatorKey } = props;

    return (
      <WithDelButton
        onDelete={() => delArgOrConstant(operatorKey, operand.id)}
        showDelete={operands.length > 2}
      >
        <BoolToogleButton
          isTrue={operand.val}
          setIsTrue={(val) => updateConstant(operatorKey, operand.id, val)}
        />
      </WithDelButton>
    );
  } else if (operand.arg) {
    const { delArgOrConstant, updateVar, operatorKey, variables } = props;

    return (
      <WithDelButton
        onDelete={() => delArgOrConstant(operatorKey, operand.id)}
        showDelete={operands.length > 2}
      >
        <VariableDropdown
          variableName={operand.arg}
          isTrue={variables[operand.arg]}
          options={variables}
          updateArg={(val) => updateVar(operatorKey, operand.id, val)}
        />
      </WithDelButton>
    );
  } else if (operand.op) {
    const newProps = { ...props, ...props.ops[operand.op] };
    newProps.parentkey = props.operatorKey;
    newProps.operatorKey = operand.op;
    newProps.result = props.results[operand.op];

    return <Operation operator={operator} operands={operands} {...newProps} />;
  }
};

const Operation = ({ operator, operands, ...props }) => {
  return (
    <div
      className={`border-l-2 ${
        props.result
          ? "border-green-700 hover:border-green-500"
          : "border-red-700 hover:border-red-500"
      } ml-2 my-2 pl-4`}
    >
      <div
        className={`font-bold flex gap-2 cursor-pointer ${
          props.result ? "text-green-500" : "text-red-500"
        }`}
      >
        <div
          onClick={() =>
            props.updateOp(props.operatorKey, operator == "and" ? "or" : "and")
          }
        >
          <span className="uppercase">{operator}</span> |{" "}
          <span className="capitalize">{props.result.toString()}</span>
        </div>{" "}
        {props.numOfOperandsInParent > 2 && (
          <DelButton
            onClick={() => props.delOp(props.parentkey, props.operatorKey)}
          />
        )}
      </div>
      {operands.map((operand) => (
        <div key={operand.id} className="p-1">
          {createOperand({
            operand,
            operator,
            operands,
            ...props,
          })}
        </div>
      ))}
      <div className="mt-2">
        <Dropdown
          options={["Constant", "Argument", "AND", "OR"]}
          label="+ Add"
          createConstant={() => props.createConstant(props.operatorKey)}
          createArg={() => props.createArg(props.operatorKey)}
          createOp={(operator) => props.createOp(props.operatorKey, operator)}
        />
      </div>
    </div>
  );
};

export default Operation;
