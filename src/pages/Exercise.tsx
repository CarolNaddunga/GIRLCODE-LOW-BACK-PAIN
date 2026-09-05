import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Check, RotateCcw } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'

export default function Exercise() {
  const navigate = useNavigate()
  const location = useLocation()
  const exerciseName = (location.state as { exercise?: string } | null)?.exercise ?? 'Pelvic Tilt'
  const totalSets = 3
  const [set, setSet] = useState(1)
  const [done, setDone] = useState(false)

  function completeSet() {
    if (set < totalSets) {
      setSet((s) => s + 1)
    } else {
      setDone(true)
    }
  }

  return (
    <div className="max-w-[640px]">
      <h1 className="display text-2xl font-semibold mb-1">{exerciseName}</h1>
      <p className="text-ink-soft text-sm mb-8">Set {Math.min(set, totalSets)} of {totalSets} · 12 reps each</p>

      <GlassCard className="p-10 flex flex-col items-center text-center">
        {!done ? (
          <>
            <div className="w-48 h-48 rounded-2xl bg-white/50 flex items-center justify-center mb-8">
              <svg width="90" height="120" viewBox="0 0 90 120" fill="none">
                <ellipse cx="45" cy="16" rx="14" ry="15" fill="#6D5DFB" />
                <rect x="24" y="34" width="42" height="52" rx="16" fill="#6D5DFB" opacity="0.85" />
                <rect x="10" y="40" width="14" height="42" rx="7" fill="#6D5DFB" opacity="0.7" />
                <rect x="66" y="40" width="14" height="42" rx="7" fill="#6D5DFB" opacity="0.7" />
                <rect x="28" y="86" width="14" height="34" rx="7" fill="#6D5DFB" opacity="0.75" />
                <rect x="48" y="86" width="14" height="34" rx="7" fill="#6D5DFB" opacity="0.75" />
              </svg>
            </div>
            <p className="text-sm text-ink-soft mb-8 max-w-[380px]">
              Lie on your back, knees bent. Gently flatten your lower back against the floor by tightening your
              stomach muscles, hold 5 seconds, then release.
            </p>
            <button
              onClick={completeSet}
              className="rounded-xl bg-violet text-white font-semibold px-8 py-3 text-sm shadow-[0_8px_20px_rgba(109,93,251,0.35)] hover:bg-violet-deep transition-colors flex items-center gap-2"
            >
              <Check size={16} /> Mark set complete
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-mint/20 flex items-center justify-center mb-5">
              <Check size={28} className="text-mint" />
            </div>
            <h2 className="display text-xl font-semibold mb-2">Nice work!</h2>
            <p className="text-sm text-ink-soft mb-8">You completed all {totalSets} sets of {exerciseName}.</p>
            <div className="flex gap-3">
              <button
                onClick={() => { setSet(1); setDone(false) }}
                className="rounded-xl glass px-5 py-3 text-sm font-semibold flex items-center gap-2 hover:bg-white/70 transition-colors"
              >
                <RotateCcw size={15} /> Do it again
              </button>
              <button
                onClick={() => navigate('/assessment/recommendations')}
                className="rounded-xl bg-violet text-white font-semibold px-5 py-3 text-sm hover:bg-violet-deep transition-colors"
              >
                Back to plan
              </button>
            </div>
          </>
        )}
      </GlassCard>
    </div>
  )
}