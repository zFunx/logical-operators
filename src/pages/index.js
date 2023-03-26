import { useState, useEffect } from "react";

// Components
import Nav from "@/components/Nav";
import Variables from "@/components/Variables/Variables";
import Operation from "@/components/Operation/Operation";
import Dropdown from "@/components/Dropdown/Dropdown";
import WithDelButton from "@/components/WithDelButton.js";
import BoolToogleButton from "@/components/Button/BoolToogleButton.js";
import VariableDropdown from "@/components/Dropdown/VariableDropdown.js";

// Helpers
import { createRandomId } from "@/lib/id";

const rootKey = "root";
const firstOperationKey = "firstOp";

export default function Home() {
  // States
  const [singleConstant, setSingleConstant] = useState(undefined); // when only single constant is present
  const [singleArg, setSingleArg] = useState(undefined); // when only single argument is present
  const [finalResult, setFinalResult] = useState(false); // final result of the logic execution
  const [variables, setVariables] = useState({
    // User created variables
    "My Arg": false,
  });
  const [ops, setOps] = useState({
    // AND and OR operations
    [firstOperationKey]: {
      operator: "or",
      operands: [
        { id: "a1", val: false },
        { id: "a2", val: false },
        { id: "a3", op: "second" },
      ],
    },
    second: {
      operator: "and",
      operands: [
        { id: "b1", val: false },
        { id: "b2", val: true },
        { id: "b3", arg: "My Arg" },
      ],
    },
  });
  const [results, setResults] = useState({
    // result of individual operation
    [firstOperationKey]: false,
    second: false,
  });

  useEffect(() => {
    if (ops) {
      const tempResults = { ...results };
      Object.keys(ops)
        .reverse()
        .map((key) => {
          if ("or" == ops[key].operator) {
            let result = false;
            ops[key].operands.some((operand) => {
              const val = getBoolFromOperand(operand, tempResults);
              if (val) {
                result = true;
                return true;
              }
            });

            tempResults[key] = result;
          } else if ("and" == ops[key].operator) {
            let result = true;
            ops[key].operands.some((operand) => {
              const val = getBoolFromOperand(operand, tempResults);
              if (!val) {
                result = false;
                return true;
              }
            });

            tempResults[key] = result;
          }
        });

      setResults(tempResults);

      if (singleConstant != undefined) {
        setFinalResult(singleConstant);
      } else if (singleArg != undefined) {
        setFinalResult(variables[singleArg]);
      } else {
        setFinalResult(tempResults[firstOperationKey]);
      }
    }
  }, [ops, variables]);

  useEffect(() => {
    if (singleConstant != undefined) {
      setFinalResult(singleConstant);
    }
  }, [singleConstant]);

  useEffect(() => {
    if (singleArg != undefined) {
      setFinalResult(variables[singleArg]);
    }
  }, [singleArg]);

  const getBoolFromOperand = (operand, results) => {
    if (operand.val?.toString()) {
      return operand.val;
    } else if (operand.arg) {
      return variables[operand.arg];
    } else if (operand.op) {
      return results[operand.op];
    }
  };

  // Update states
  const updateConstant = (parentKey, operandId, val) => {
    const tempOps = { ...ops };
    const matchedOperand = tempOps[parentKey].operands.find(
      (operand) => operandId == operand.id
    );
    matchedOperand.val = val;

    setOps(tempOps);
  };
  const updateVar = (parentKey, operandId, val) => {
    const tempOps = { ...ops };
    const matchedOperand = tempOps[parentKey].operands.find(
      (operand) => operandId == operand.id
    );
    matchedOperand.arg = val;

    setOps(tempOps);
  };
  /**
   * Toggle between OR and AND operators
   */
  const updateOp = (parentkey, operator) => {
    const tempOps = { ...ops };
    tempOps[parentkey].operator = operator;

    setOps(tempOps);
  };

  // Delete states
  /**
   * Delete operand and associated operation
   */
  const delOp = (parentkey, opKey) => {
    if (rootKey == parentkey) {
      setOps({});
      setResults({});
    } else {
      const tempOps = { ...ops };
      tempOps[parentkey].operands = tempOps[parentkey].operands.filter(
        (operand) => operand.op != opKey
      );

      delete tempOps[opKey];

      const tempResults = { ...results };
      delete tempResults[opKey];

      setOps(tempOps);
      setResults(tempResults);
    }
  };
  const delArgOrConstant = (parentkey, opId) => {
    const tempOps = { ...ops };
    if (parentkey) {
      tempOps[parentkey].operands = tempOps[parentkey].operands.filter(
        (operand) => operand.id != opId
      );
    }

    setOps(tempOps);
  };

  const createConstant = (parentkey) => {
    const tempOps = { ...ops };
    tempOps[parentkey].operands.push({
      id: createRandomId(),
      val: false,
    });

    setOps(tempOps);
  };
  const createArg = (parentkey) => {
    const tempOps = { ...ops };
    tempOps[parentkey].operands.push({
      id: createRandomId(),
      arg: Object.keys(variables)[0],
    });

    setOps(tempOps);
  };
  const createOp = (parentkey, operator) => {
    const tempOps = { ...ops };
    const tempResults = { ...results };
    const newOpId = rootKey == parentkey ? firstOperationKey : createRandomId();

    tempOps[newOpId] = {
      operator,
      operands: [
        { id: createRandomId(), val: false },
        { id: createRandomId(), val: false },
      ],
    };

    if (rootKey != parentkey) {
      tempOps[parentkey].operands.push({
        id: createRandomId(),
        op: newOpId,
      });
    }

    tempResults[newOpId] = false;

    setOps(tempOps);
    setResults(tempResults);
  };

  // when only single constant is present
  const createSingleConstant = () => {
    setSingleConstant(false);
  };
  const deleteSingleConstant = () => {
    setFinalResult(undefined);
    setSingleConstant(undefined);
  };

  // when only single argument is present
  const createSingleArg = () => {
    setSingleArg(Object.keys(variables)[0]);
    setFinalResult(variables[Object.keys(variables)[0]]);
  };
  const deleteSingleArg = () => {
    setSingleArg(undefined);
    setFinalResult(undefined);
  };

  return (
    <div className="w-screen h-screen bg-slate-900 flex flex-col text-slate-200">
      <Nav result={finalResult} />
      <div className="flex flex-1 overflow-hidden">
        <div className="basis-80 bg-slate-800">
          <Variables variables={variables} setVariables={setVariables} />
        </div>
        <div className="overflow-auto w-full">
          {Object.keys(ops).length > 0 && (
            <Operation
              parentkey={rootKey}
              operatorKey={firstOperationKey}
              {...ops[firstOperationKey]}
              ops={ops}
              variables={variables}
              result={results[firstOperationKey]}
              results={results}
              updateConstant={updateConstant}
              updateVar={updateVar}
              delOp={delOp}
              delArgOrConstant={delArgOrConstant}
              numOfOperandsInParent={3}
              createConstant={createConstant}
              createArg={createArg}
              createOp={createOp}
              updateOp={updateOp}
            />
          )}
          {typeof singleConstant !== "undefined" && (
            <div className="p-4">
              <WithDelButton onDelete={deleteSingleConstant} showDelete={true}>
                <BoolToogleButton
                  isTrue={singleConstant}
                  setIsTrue={(val) => setSingleConstant(val)}
                />
              </WithDelButton>
            </div>
          )}
          {typeof singleArg !== "undefined" && (
            <div className="p-4">
              <WithDelButton onDelete={deleteSingleArg} showDelete={true}>
                <VariableDropdown
                  variableName={singleArg}
                  isTrue={variables[singleArg]}
                  options={variables}
                  updateArg={(val) => setSingleArg(val)}
                />
              </WithDelButton>
            </div>
          )}
          {Object.keys(ops).length == 0 &&
            typeof singleConstant == "undefined" &&
            typeof singleArg == "undefined" && (
              <div className="p-4">
                <Dropdown
                  options={["Constant", "Argument", "AND", "OR"]}
                  label="+ Add"
                  createConstant={createSingleConstant}
                  createArg={createSingleArg}
                  createOp={(operator) => createOp(rootKey, operator)}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
