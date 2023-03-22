import { useState } from "react";

import checkImage from "@/assets/circle-check-solid.svg"
import xImage from "@/assets/circle-xmark-solid.svg"

const BoolCheckbox = () => {
    console.log(checkImage);
    const [isTrue, setIsTrue] = useState(false);
    const toggleTruth = () => setIsTrue(prev => !prev)

    return (
        <div className="w-6 h-6 bg-neutral-200 rounded-full"><img width={24} onClick={toggleTruth} src={isTrue ? checkImage.src: xImage.src} /></div>
    )
}

export default BoolCheckbox