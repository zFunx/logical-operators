import Badge from '@/components/Badge'

const Nav = () => {
  return (
    <nav className="bg-sky-700 px-4 py-2 text-slate-200 font-bold text-lg flex gap-4 items-center">Logic Operators <Badge text="Result: True" isTrue={true} /></nav>
  )
}

export default Nav