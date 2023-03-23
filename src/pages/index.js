import { useState } from "react";

import Nav from '@/components/nav'
import Variables from '@/components/Variables/Variables'

export default function Home() {
  const [variables, setVariables] = useState({
    'My Arg': false,
  })

  return (
    <div className="w-screen h-screen bg-slate-900 flex flex-col">
      <Nav />
      <div className="flex flex-1">
        <div className='basis-60'>
          <Variables variables={variables} setVariables={setVariables} />
        </div>
      </div>
    </div>
  )
}