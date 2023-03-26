// Components
import BoolToogleButton from "@/components/Button/BoolToogleButton.js";
import VariableDropdown from "@/components/Dropdown/VariableDropdown.js";
import WithDelButton from "@/components/WithDelButton.js";
import DelButton from "@/components/Button/DelButton";
import Dropdown from "@/components/Dropdown/Dropdown";

const createOperand = ({
  operatorKey,
  operand,
  variables,
  ops,
  results,
  updateConstant,
  rootUpdateConstant,
  updateVar,
  rootUpdateVar,
  delOp,
  parentkey,
  delArgOrConstant,
  numOfOperandsInParent,
  createConstant,
  createArg,
  createOp,
  updateOp,
}) => {
  if (operand.val?.toString()) {
    return (
      <WithDelButton
        onDelete={() => delArgOrConstant(parentkey, operand.id)}
        showDelete={numOfOperandsInParent > 2}
      >
        <BoolToogleButton
          isTrue={operand.val}
          setIsTrue={(val) => updateConstant(operatorKey, operand.id, val)}
        />
      </WithDelButton>
    );
  } else if (operand.arg) {
    return (
      <WithDelButton
        onDelete={() => delArgOrConstant(parentkey, operand.id)}
        showDelete={numOfOperandsInParent > 2}
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
    return (
      <Operation
        operatorKey={operand.op}
        {...ops[operand.op]}
        ops={ops}
        variables={variables}
        result={results[operand.op]}
        results={results}
        updateConstant={rootUpdateConstant}
        updateVar={rootUpdateVar}
        delOp={delOp}
        parentkey={parentkey}
        delArgOrConstant={delArgOrConstant}
        numOfOperandsInParent={numOfOperandsInParent}
        createConstant={createConstant}
        createArg={createArg}
        createOp={createOp}
        updateOp={updateOp}
      />
    );
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
            operatorKey: props.operatorKey,
            operand,
            variables: props.variables,
            ops: props.ops,
            results: props.results,
            updateConstant: props.updateConstant,
            rootUpdateConstant: props.updateConstant,
            updateVar: props.updateVar,
            rootUpdateVar: props.updateVar,
            delOp: props.delOp,
            parentkey: props.operatorKey,
            delArgOrConstant: props.delArgOrConstant,
            numOfOperandsInParent: operands.length,
            createConstant: props.createConstant,
            createArg: props.createArg,
            createOp: props.createOp,
            updateOp: props.updateOp,
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
