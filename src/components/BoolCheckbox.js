import { PropTypes } from "prop-types"

import checkImage from "@/assets/circle-check-solid.svg"
import xImage from "@/assets/circle-xmark-solid.svg"

const BoolCheckbox = props => {
    return (
        <img className="w-6 h-6 bg-neutral-200 rounded-full cursor-pointer" width={24} onClick={props.toggleTruth} src={props.isTrue ? checkImage.src: xImage.src} />
    )
}

BoolCheckbox.propTypes = {
    isTrue: PropTypes.bool.isRequired,
    toggleTruth: PropTypes.func
}

export default BoolCheckbox