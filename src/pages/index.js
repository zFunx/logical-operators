import { useState, useEffect } from "react";

import Nav from '@/components/nav'
import Variables from '@/components/Variables/Variables'
import Dropdown from '@/components/Dropdown/Dropdown'
import Operation from '@/components/Operation/Operation'

export default function Home() {
  const [variables, setVariables] = useState({
    'My Arg': false,
  })
  const [ops, setOps] = useState({
    firstOp: {
      operator: 'or',
      operands: [{ id: 'a1', val: false }, { id: 'a2', val: false }, { id: 'b1', arg: 'My Arg' }, { id: 'c1', op: 'second' }],
    },
    second: {
      operator: 'and',
      operands: [{ id: 'd1', val: false }, { id: 'd2', val: true }, { id: 'e2', arg: 'My Arg' }]
    }
  }
  )

  const [results, setResults] = useState({
    firstOp: false,
    second: false
  })

  const getBoolFromOperand = (operand, results) => {
    if (operand.val?.toString()) {
      return operand.val
    } else if (operand.arg) {
      return variables[operand.arg]
    } else if (operand.op) {
      return results[operand.op]
    }
  }

  useEffect(() => {
    if (ops) {
      // const ops = {...ops};
      const tempResults = { ...results };
      Object.keys(ops).reverse().map(key => {
        if ('or' == ops[key].operator) {
          let result = false;
          ops[key].operands.some((operand) => {
            const val = getBoolFromOperand(operand, tempResults)
            // console.log('result', operand,val);
            if (val) {
              result = true
              return true;
            }
          });

          tempResults[key] = result;
        } else if ('and' == ops[key].operator) {
          let result = true;
          ops[key].operands.some((operand) => {
            const val = getBoolFromOperand(operand, tempResults)
            if (!val) {
              result = false
              return true;
            }
          });

          tempResults[key] = result;
        }
      })

      setResults(tempResults)
    }
  }, [ops, variables])

  const updateConstant = (operatorKey, operandId, val) => {
    const tempOps = { ...ops }
    const matchedOperand = tempOps[operatorKey].operands.find(operand => operandId == operand.id);
    matchedOperand.val = val;

    setOps(tempOps)
  }
  const updateVar = (operatorKey, operandId, val) => {
    const tempOps = { ...ops }
    const matchedOperand = tempOps[operatorKey].operands.find(operand => operandId == operand.id);
    matchedOperand.arg = val;

    setOps(tempOps)
  }

  return (
    <div className="w-screen h-screen bg-slate-900 flex flex-col">
      <Nav />
      <div className="flex flex-1">
        <div className='basis-60'>
          <Variables variables={variables} setVariables={setVariables} />
        </div>
        {/* <div> */}
        <Operation operatorKey="firstOp" {...ops.firstOp} ops={ops} variables={variables} result={results.firstOp} results={results} updateConstant={updateConstant} updateVar={updateVar} />
        {/* <Dropdown options={['Constant', 'Argument', 'AND', 'OR']} label="+ Add" /> */}
        {/* </div> */}
      </div>
    </div>
  )
}