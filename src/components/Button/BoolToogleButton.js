import { useState } from "react";

import BoolCheckbox from '@/components/BoolCheckbox'

const BoolToogleButton = props => {
    // const [isTrue, setisTrue] = useState(false);
    const toggleTruth = () => props.setIsTrue(!props.isTrue)

    return (
        <div className={`${props.isTrue ? 'bg-green-700/20' : 'bg-red-700/20'} p-2 rounded-md flex justify-between cursor-pointer`} onClick={toggleTruth}>
            {props.isTrue ? 'True': 'False'}
            <BoolCheckbox isTrue={props.isTrue} />
        </div>
    )
}

export default BoolToogleButton