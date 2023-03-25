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
      result: false,
      operator: 'or',
      operands: [{ id: 'a1', val: false }, { id: 'a2', val: true }, { id: 'b1', arg: 'My Arg' }, { id: 'c1', op: 'second' }],
    },
    second: {
      result: false,
      operator: 'and',
      operands: [{ id: 'd1', val: false }, { id: 'd2', val: true }, { id: 'e2', arg: 'My Arg' }]
    }
  }
  )

  const getBoolFromOperand = (operand) => {
    if (operand.val?.toString()) {
      return operand.val
    } else if (operand.arg) {
      return variables[operand.arg]
    } else if (operand.op) {
      return ops[operand.op].result
    }
  }

  useEffect(() => {
    if (ops) {
      const tempOps = ops;
      Object.keys(tempOps).reverse().map(key => {
        if ('or' == tempOps[key].operator) {
          let result = false;
          tempOps[key].operands.some((operand) => {
            const val = getBoolFromOperand(operand)
            if (val) {
              result = true
              return true;
            }
          });

          tempOps[key].result = result;
        } else if ('and' == tempOps[key].operator) {
          let result = true;
          tempOps[key].operands.some((operand) => {
            const val = getBoolFromOperand(operand)
            if (!val) {
              result = false
              return true;
            }
          });
          
          tempOps[key].result = result;
        }
      })
    }
  }, [ops])


  return (
    <div className="w-screen h-screen bg-slate-900 flex flex-col">
      <Nav />
      <div className="flex flex-1">
        <div className='basis-60'>
          <Variables variables={variables} setVariables={setVariables} />
        </div>
        {/* <div> */}
        <Operation {...ops.firstOp} ops={ops} variables={variables} />
        {/* <Dropdown options={['Constant', 'Argument', 'AND', 'OR']} label="+ Add" /> */}
        {/* </div> */}
      </div>
    </div>
  )
}