import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { GlassCard, StatusPill } from '../components/GlassCard'
import { painTrend, recentScans } from '../data/mock'

export default function ProgressPage() {
  return (
    <div>
      <h1 className="display text-2xl font-semibold mb-1">Your progress</h1>
      <p className="text-ink-soft text-sm mb-8">Every scan and how your reported pain has moved since.</p>

      <GlassCard className="p-7 mb-5">
        <h3 className="font-semibold text-sm mb-4">Pain over time</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={painTrend} margin={{ top: 6, right: 12, left: -12, bottom: 0 }}>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6b6b85' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#6b6b85' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(76,63,130,0.15)' }} />
            <Line type="monotone" dataKey="pain" stroke="#6D5DFB" strokeWidth={2.5} dot={{ r: 4, fill: '#6D5DFB' }} />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard className="p-7">
        <h3 className="font-semibold text-sm mb-4">Scan history</h3>
        <div className="flex flex-col divide-y divide-white/60">
          {[...recentScans, ...recentScans].map((s, i) => (
            <div key={i} className="flex items-center justify-between py-3.5">
              <div>
                <p className="text-sm font-medium">{s.concern}</p>
                <p className="text-xs text-ink-soft">{s.date}</p>
              </div>
              <StatusPill status={s.severity as 'good' | 'mild' | 'watch'}>
                {s.severity === 'good' ? 'Good' : s.severity === 'mild' ? 'Mild' : 'Watch'}
              </StatusPill>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}