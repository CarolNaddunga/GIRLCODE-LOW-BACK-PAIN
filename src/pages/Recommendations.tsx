import { useNavigate } from 'react-router-dom'
import { Dumbbell, Lightbulb, Stethoscope } from 'lucide-react'
import { Card } from '../components/Card'
import { ExerciseIllustration } from '../components/ExerciseIllustration'
import { AssessmentProgress } from '../components/Layout'
import { recommendations } from '../data/mock'

const tierMeta: Record<string, { icon: typeof Dumbbell; label: string; color: string }> = {
  exercise: { icon: Dumbbell, label: 'Corrective exercise', color: 'text-violet-deep' },
  guidance: { icon: Lightbulb, label: 'Activity guidance', color: 'text-[#b3760f]' },
  referral: { icon: Stethoscope, label: 'Professional referral', color: 'text-[#c94a3f]' },
}

export default function Recommendations() {
  const navigate = useNavigate()

  return (
    <div className="max-w-[880px]">
      <AssessmentProgress step={4} />
      <h1 className="display text-2xl font-semibold mb-1">Your plan</h1>
      <p className="text-ink-soft text-sm mb-8">
        Ranging from exercises you can start now to a physiotherapy check-in if things don't ease up.
      </p>

      <div className="flex flex-col gap-4">
        {recommendations.map((r) => {
          const meta = tierMeta[r.tier]
          const Icon = meta.icon
          return (
            <Card key={r.id} className="p-5 flex items-center gap-4">
              {r.tier === 'exercise' ? (
                <ExerciseIllustration name={r.title} className="w-14 h-14 rounded-xl bg-violet-tint p-2 shrink-0" />
              ) : (
                <div className="w-11 h-11 rounded-xl bg-violet-tint flex items-center justify-center shrink-0">
                  <Icon size={20} className={meta.color} />
                </div>
              )}
              <div className="flex-1">
                <p className={`text-[11px] font-medium ${meta.color} mb-0.5`}>{meta.label}</p>
                <p className="font-semibold text-sm">{r.title}</p>
                <p className="text-xs text-ink-soft mt-1">{r.reason}</p>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <p className="text-xs font-medium">{r.duration}</p>
                <p className="text-[11px] text-ink-soft">{r.difficulty}</p>
              </div>
              {r.tier === 'exercise' && (
                <button
                  onClick={() => navigate('/exercise', { state: { exercise: r.title } })}
                  className="rounded-lg bg-violet text-white text-xs font-semibold px-4 py-2 shrink-0 hover:bg-violet-deep transition-colors"
                >
                  Start
                </button>
              )}
            </Card>
          )
        })}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="rounded-xl border border-line px-6 py-3 text-sm font-semibold text-ink hover:bg-canvas transition-colors"
        >
          Back to dashboard
        </button>
      </div>
    </div>
  )
}