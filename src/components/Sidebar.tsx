import { NavLink } from 'react-router-dom'
import { LayoutGrid, ScanFace, LineChart, Dumbbell, UserRound } from 'lucide-react'
import Logo from './Logo'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/assessment', label: 'AI Analyzer', icon: ScanFace },
  { to: '/exercises', label: 'Exercises', icon: Dumbbell },
  { to: '/progress', label: 'Progress', icon: LineChart },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-[240px] shrink-0 h-screen sticky top-0 py-8 px-5 border-r border-line bg-paper">
      <div className="px-2 mb-10">
        <Logo />
      </div>

      <nav className="flex flex-col gap-1">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? 'bg-violet-tint text-violet-deep' : 'text-ink-soft hover:bg-canvas hover:text-ink'
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="rounded-2xl border border-line bg-canvas p-4">
          <p className="text-xs text-ink-soft leading-relaxed">
            Feeling a flare-up that won't ease? Don't wait on exercises alone.
          </p>
          <button className="mt-3 text-xs font-semibold text-violet-deep">Find a physiotherapist</button>
        </div>
      </div>
    </aside>
  )
}