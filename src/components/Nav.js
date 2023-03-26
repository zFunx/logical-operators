import Badge from '@/components/Badge'

const Nav = props => {
  return (
    <nav className="bg-sky-700 px-4 py-2 text-slate-200 font-bold text-lg flex gap-4 items-center">Logic Operators {props.result != undefined && <Badge text={props.result ? "Result: True" : "Result: False"} isTrue={props.result} />}</nav>
  )
}

export default Nav