import { useState } from "react";

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
      operands: [{ id: 'a1', val: false }, { id: 'a2', val: true }, { id: 'b1', arg: 'My Arg' }, { id: 'c1', op: 'second' }],
    },
    second: {
      operator: 'and',
      operands: [{ id: 'd1', val: false }, { id: 'd2', val: true }, { id: 'e2', arg: 'My Arg' }]
    }
  }
  )

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