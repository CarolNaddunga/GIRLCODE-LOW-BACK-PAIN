import { GlassCard } from '../components/GlassCard'
import { user } from '../data/mock'

export default function Profile() {
  return (
    <div className="max-w-[640px]">
      <h1 className="display text-2xl font-semibold mb-1">Profile</h1>
      <p className="text-ink-soft text-sm mb-8">Your details help personalize recommendations.</p>

      <GlassCard className="p-7 flex items-center gap-4 mb-5">
        <div className="w-16 h-16 rounded-full bg-violet flex items-center justify-center text-white text-xl font-semibold display">
          {user.firstName[0]}
        </div>
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-ink-soft">{user.occupation}</p>
        </div>
      </GlassCard>

      <GlassCard className="p-7 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-soft">Check-in streak</span>
          <span className="text-sm font-semibold">{user.streakDays} days</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-soft">Reminders</span>
          <span className="text-sm font-semibold">Daily, 9:00 AM</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-soft">Data & privacy</span>
          <button className="text-sm font-semibold text-violet-deep">Manage</button>
        </div>
      </GlassCard>
    </div>
  )
}