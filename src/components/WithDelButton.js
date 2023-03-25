import delImage from "@/assets/trash-can-solid.svg"

const WithDelButton = props => {
  return (
    <div className="flex gap-2">
        <div>{props.children}</div>
        <img className="mr-2 cursor-pointer opacity-70 hover:opacity-100" width={14} onClick={props.deleteVariable} src={delImage.src} />
    </div>
  )
}

export default WithDelButton