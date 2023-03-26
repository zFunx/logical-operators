import delImage from "@/assets/trash-can-solid.svg"

const DelButton = (props) => {
  return (
    <img onClick={props.onClick} className="cursor-pointer opacity-70 hover:opacity-100" width={14} src={delImage.src} />
  )
}

export default DelButton