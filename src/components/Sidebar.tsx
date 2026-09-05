import { NavLink } from 'react-router-dom'
import { LayoutGrid, ScanFace, LineChart, Dumbbell, UserRound, Activity } from 'lucide-react'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/assessment', label: 'AI Analyzer', icon: ScanFace },
  { to: '/exercises', label: 'Exercises', icon: Dumbbell },
  { to: '/progress', label: 'Progress', icon: LineChart },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-[240px] shrink-0 h-screen sticky top-0 py-8 px-5">
      <div className="flex items-center gap-2.5 px-2 mb-10">
        <div className="w-9 h-9 rounded-xl bg-violet flex items-center justify-center shadow-[0_6px_16px_rgba(109,93,251,0.35)]">
          <Activity size={18} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="display font-semibold text-lg text-ink">BakPose</span>
      </div>

      <nav className="flex flex-col gap-1">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/70 text-violet-deep shadow-[0_2px_10px_rgba(76,63,215,0.12)]'
                  : 'text-ink-soft hover:bg-white/40 hover:text-ink'
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="glass rounded-2xl p-4">
          <p className="text-xs text-ink-soft leading-relaxed">
            Feeling a flare-up that won't ease? Don't wait on exercises alone.
          </p>
          <button className="mt-3 text-xs font-semibold text-violet-deep">Find a physiotherapist</button>
        </div>
      </div>
    </aside>
  )
}