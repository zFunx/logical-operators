import { useState, useEffect } from "react";

// Components
import Nav from '@/components/Nav'
import Variables from '@/components/Variables/Variables'
// import Dropdown from '@/components/Dropdown/Dropdown'
import Operation from '@/components/Operation/Operation'

// Helpers
import { createRandomId } from '@/lib/id'

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
  const delOp = (parentkey, opKey) => {
    const tempOps = { ...ops };
    if (parentkey) {
      tempOps[parentkey].operands = tempOps[parentkey].operands.filter(operand => operand.op != opKey)
    }
    delete tempOps[opKey]

    const tempResults = { ...results }
    delete tempResults[opKey]

    setOps(tempOps)
    setResults(tempResults)
  }
  const delArgOrConstant = (parentkey, opId) => {
    const tempOps = { ...ops };
    if (parentkey) {
      tempOps[parentkey].operands = tempOps[parentkey].operands.filter(operand => operand.id != opId)
    }

    setOps(tempOps)
  }
  const createConstant = (parentkey) => {
    const tempOps = { ...ops };
    tempOps[parentkey].operands.push({
      id: createRandomId(),
      val: false
    })

    setOps(tempOps)
  }
  const createArg = (parentkey) => {
    const tempOps = { ...ops };
    tempOps[parentkey].operands.push({
      id: createRandomId(),
      arg: Object.keys(variables)[0]
    })

    setOps(tempOps)
  }
  const createOp = (parentkey, operator) => {
    const tempOps = { ...ops };
    const tempResults = { ...results }
    const newOpId = createRandomId();

    tempOps[newOpId] = {
      operator,
      operands: [{ id: createRandomId(), val: false }, { id: createRandomId(), val: false }]
    }

    tempOps[parentkey].operands.push({
      id: createRandomId(),
      op: newOpId
    })

    tempResults[newOpId] = false

    setOps(tempOps)
    setResults(tempResults)
  }

  return (
    <div className="w-screen h-screen bg-slate-900 flex flex-col">
      <Nav />
      <div className="flex flex-1">
        <div className='basis-60'>
          <Variables variables={variables} setVariables={setVariables} />
        </div>
        <Operation operatorKey="firstOp" {...ops.firstOp} ops={ops} variables={variables} result={results.firstOp} results={results} updateConstant={updateConstant} updateVar={updateVar} delOp={delOp} delArgOrConstant={delArgOrConstant} numOfOperandsInParent={0} createConstant={createConstant} createArg={createArg} createOp={createOp} />
      </div>
    </div>
  )
}