import Nav from '@/components/nav'
import Variables from '@/components/Variables/Variables'

export default function Home() {
  return (
    <div className="w-screen h-screen bg-slate-900 flex flex-col">
      <Nav />
      <div className="flex flex-1">
        <Variables />
      </div>
    </div>
  )
}