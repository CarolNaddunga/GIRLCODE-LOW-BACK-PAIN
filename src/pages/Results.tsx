import { useLocation, useNavigate } from 'react-router-dom'
import { Card, StatusPill } from '../components/Card'
import { ImagePlaceholder } from '../components/ImagePlaceholder'
import RingGauge from '../components/RingGauge'
import { AssessmentProgress } from '../components/Layout'

type Readings = { trunkAngleDeg: number; hipAlignmentPct: number; symmetryPct: number }

function statusFor(metric: 'trunk' | 'hip' | 'sym', v: number): 'good' | 'mild' | 'watch' {
  if (metric === 'trunk') return v <= 6 ? 'good' : v <= 15 ? 'mild' : 'watch'
  return v >= 90 ? 'good' : v >= 75 ? 'mild' : 'watch'
}

export default function Results() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { readings?: Readings; imageUrl?: string } | null
  const readings = state?.readings ?? {
    trunkAngleDeg: 14,
    hipAlignmentPct: 92,
    symmetryPct: 88,
  }
  const imageUrl = state?.imageUrl

  const trunkStatus = statusFor('trunk', readings.trunkAngleDeg)
  const hipStatus = statusFor('hip', readings.hipAlignmentPct)
  const symStatus = statusFor('sym', readings.symmetryPct)

  return (
    <div className="max-w-[880px]">
      <AssessmentProgress step={3} />
      <div className="flex items-start gap-5 mb-8">
        <div className="flex-1">
          <h1 className="display text-2xl font-semibold mb-1">Your movement profile</h1>
          <p className="text-ink-soft text-sm">Measured from your photo and combined with what you told us.</p>
        </div>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Photo this scan was measured from"
            className="w-20 h-20 rounded-xl object-cover border border-line shrink-0"
          />
        ) : (
          <ImagePlaceholder label="Scan photo" className="w-20 h-20 shrink-0" compact />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        <Card className="p-6 flex flex-col items-center text-center">
          <RingGauge
            value={Math.min(100, readings.trunkAngleDeg * 5)}
            label={`${readings.trunkAngleDeg}°`}
            sublabel="trunk angle"
            color={trunkStatus === 'good' ? 'var(--color-mint)' : trunkStatus === 'mild' ? 'var(--color-amber)' : 'var(--color-coral)'}
          />
          <div className="mt-3"><StatusPill status={trunkStatus}>{trunkStatus === 'good' ? 'Good' : trunkStatus === 'mild' ? 'Mild lean' : 'Notable lean'}</StatusPill></div>
        </Card>

        <Card className="p-6 flex flex-col items-center text-center">
          <RingGauge
            value={readings.hipAlignmentPct}
            label={`${readings.hipAlignmentPct}%`}
            sublabel="hip alignment"
            color={hipStatus === 'good' ? 'var(--color-mint)' : hipStatus === 'mild' ? 'var(--color-amber)' : 'var(--color-coral)'}
          />
          <div className="mt-3"><StatusPill status={hipStatus}>{hipStatus === 'good' ? 'Good' : hipStatus === 'mild' ? 'Mild' : 'Watch'}</StatusPill></div>
        </Card>

        <Card className="p-6 flex flex-col items-center text-center">
          <RingGauge
            value={readings.symmetryPct}
            label={`${readings.symmetryPct}%`}
            sublabel="body symmetry"
            color={symStatus === 'good' ? 'var(--color-mint)' : symStatus === 'mild' ? 'var(--color-amber)' : 'var(--color-coral)'}
          />
          <div className="mt-3"><StatusPill status={symStatus}>{symStatus === 'good' ? 'Good' : symStatus === 'mild' ? 'Mild' : 'Watch'}</StatusPill></div>
        </Card>
      </div>

      <Card className="p-7">
        <h3 className="font-semibold text-sm mb-3">What this suggests</h3>
        <p className="text-sm text-ink-soft leading-relaxed">
          Your trunk shows a {trunkStatus === 'good' ? 'minimal' : trunkStatus === 'mild' ? 'mild' : 'noticeable'} forward
          lean, which combined with your reported pain when sitting points toward posture-related strain rather than an
          acute injury. Hip alignment and symmetry are within a reasonable range, so the plan below focuses on trunk
          posture and desk habits first.
        </p>
        <div className="flex justify-end mt-8">
          <button
            onClick={() => navigate('/assessment/recommendations')}
            className="rounded-xl bg-violet text-white font-semibold px-6 py-3 text-sm shadow-[0_8px_20px_rgba(109,93,251,0.35)] hover:bg-violet-deep transition-colors"
          >
            See my recommendations
          </button>
        </div>
      </Card>
    </div>
  )
}
