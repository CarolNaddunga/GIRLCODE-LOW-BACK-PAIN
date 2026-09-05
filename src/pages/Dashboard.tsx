import { useNavigate } from 'react-router-dom'
import { Camera, ChevronRight } from 'lucide-react'
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { GlassCard, StatusPill } from '../components/GlassCard'
import RingGauge from '../components/RingGauge'
import { user, vitals, painTrend, recentScans, insights } from '../data/mock'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="display text-3xl font-semibold">{greeting()}, {user.firstName}</h1>
          <p className="text-ink-soft text-sm mt-1">How's your back feeling today?</p>
        </div>
        <button
          onClick={() => navigate('/assessment')}
          className="rounded-xl bg-violet text-white text-sm font-semibold px-5 py-3 shadow-[0_8px_20px_rgba(109,93,251,0.35)] hover:bg-violet-deep transition-colors"
        >
          New assessment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <GlassCard className="lg:col-span-2 p-7 relative overflow-hidden">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs font-medium text-ink-soft mb-1">Current movement health</p>
              <h2 className="display text-xl font-semibold">Mild forward lean detected</h2>
            </div>
            <StatusPill status="mild">Needs attention</StatusPill>
          </div>

          <div className="flex items-center justify-center py-6 relative">
            <div className="animate-float">
              <svg width="150" height="210" viewBox="0 0 150 210" fill="none">
                <defs>
                  <linearGradient id="dashBody" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8B7CFB" />
                    <stop offset="100%" stopColor="#6D5DFB" />
                  </linearGradient>
                </defs>
                <ellipse cx="75" cy="30" rx="22" ry="25" fill="url(#dashBody)" opacity="0.9" />
                <rect x="52" y="58" width="46" height="80" rx="20" fill="url(#dashBody)" opacity="0.85" />
                <rect x="34" y="65" width="18" height="64" rx="9" fill="url(#dashBody)" opacity="0.7" />
                <rect x="98" y="65" width="18" height="64" rx="9" fill="url(#dashBody)" opacity="0.7" />
                <rect x="58" y="132" width="16" height="72" rx="8" fill="url(#dashBody)" opacity="0.75" />
                <rect x="78" y="132" width="16" height="72" rx="8" fill="url(#dashBody)" opacity="0.75" />
              </svg>
            </div>

            <div className="absolute left-0 top-4 glass-deep rounded-2xl px-3.5 py-2.5 hidden sm:block">
              <p className="text-[11px] text-ink-soft">Trunk angle</p>
              <p className="font-semibold text-sm">{vitals.trunkAngle.value}° lean</p>
            </div>
            <div className="absolute right-0 top-2 glass-deep rounded-2xl px-3.5 py-2.5 hidden sm:block">
              <p className="text-[11px] text-ink-soft">Hip alignment</p>
              <p className="font-semibold text-sm">{vitals.hipAlignment.value}%</p>
            </div>
            <div className="absolute left-2 bottom-2 glass-deep rounded-2xl px-3.5 py-2.5 hidden sm:block">
              <p className="text-[11px] text-ink-soft">Symmetry</p>
              <p className="font-semibold text-sm">{vitals.symmetry.value}%</p>
            </div>
            <button
              onClick={() => navigate('/assessment')}
              className="absolute right-2 bottom-2 w-11 h-11 rounded-full bg-violet flex items-center justify-center shadow-[0_8px_20px_rgba(109,93,251,0.4)] hover:bg-violet-deep transition-colors"
              aria-label="Start new scan"
            >
              <Camera size={18} className="text-white" />
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-7 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-medium text-ink-soft mb-4 self-start">Overall symmetry</p>
          <RingGauge value={vitals.symmetry.value} label={`${vitals.symmetry.value}%`} sublabel="balanced movement" color="var(--color-mint)" />
          <p className="text-xs text-ink-soft mt-4 leading-relaxed">{vitals.symmetry.note}</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <GlassCard className="lg:col-span-2 p-7">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Pain trend, last 7 days</h3>
            <span className="text-xs text-ink-soft">Self-reported, 0–10</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={painTrend} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6b6b85' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(76,63,130,0.15)' }} />
              <Line type="monotone" dataKey="pain" stroke="#6D5DFB" strokeWidth={2.5} dot={{ r: 3, fill: '#6D5DFB' }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-7">
          <h3 className="font-semibold text-sm mb-4">Insights for you</h3>
          <ul className="flex flex-col gap-3">
            {insights.map((i, idx) => (
              <li key={idx} className="text-xs text-ink-soft leading-relaxed pl-3 border-l-2 border-violet/30">
                {i}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <GlassCard className="p-7 mt-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Recent scans</h3>
          <button onClick={() => navigate('/progress')} className="text-xs font-semibold text-violet-deep">See all</button>
        </div>
        <div className="flex flex-col divide-y divide-white/60">
          {recentScans.map((s) => (
            <div key={s.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium">{s.concern}</p>
                <p className="text-xs text-ink-soft">{s.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusPill status={s.severity as 'good' | 'mild' | 'watch'}>
                  {s.severity === 'good' ? 'Good' : s.severity === 'mild' ? 'Mild' : 'Watch'}
                </StatusPill>
                <ChevronRight size={16} className="text-ink-soft" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}