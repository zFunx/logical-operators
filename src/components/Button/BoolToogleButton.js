import { useState } from "react";

import BoolCheckbox from '@/components/BoolCheckbox'

const BoolToogleButton = () => {
    const [isTrue, setisTrue] = useState(false);
    const toggleTruth = () => setisTrue(prev => !prev)

    return (
        <div className={`${isTrue ? 'bg-green-700/20' : 'bg-red-700/20'} p-2 rounded-md flex justify-between cursor-pointer`} onClick={toggleTruth}>
            {isTrue ? 'True': 'False'}
            <BoolCheckbox isTrue={isTrue} />
        </div>
    )
}

export default BoolToogleButton