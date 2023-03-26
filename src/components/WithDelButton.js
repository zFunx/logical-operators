import DelButton from '@/components/Button/DelButton'

const WithDelButton = props => {
  return (
    <div className="flex gap-2">
        <div>{props.children}</div>
        {props.showDelete && <DelButton onClick={props.onDelete}/>}
    </div>
  )
}

export default WithDelButton