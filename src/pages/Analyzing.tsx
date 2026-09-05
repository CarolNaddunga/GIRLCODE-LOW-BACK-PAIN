import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GlassCard } from '../components/GlassCard'
import { AssessmentProgress } from '../components/Layout'
import { analyzeImage } from '../lib/pose'

const steps = ['Locating body landmarks', 'Measuring trunk angle', 'Checking hip alignment', 'Comparing symmetry']

export default function Analyzing() {
  const navigate = useNavigate()
  const location = useLocation()
  const imageUrl = (location.state as { imageUrl?: string } | null)?.imageUrl
  const [stepIndex, setStepIndex] = useState(0)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, steps.length - 1))
    }, 650)

    async function run() {
      let readings = { trunkAngleDeg: 14, hipAlignmentPct: 92, symmetryPct: 88 }
      try {
        if (imageUrl) {
          const img = new Image()
          img.src = imageUrl
          await new Promise((res, rej) => {
            img.onload = res
            img.onerror = rej
          })
          imgRef.current = img
          readings = await analyzeImage(img)
        }
      } catch {
        // MediaPipe may fail to load offline (e.g. no network for the WASM/model
        // CDN fetch) - fall back to the demo readings above so the flow still works.
      }
      setTimeout(() => {
        navigate('/assessment/results', { state: { readings } })
      }, 2600)
    }
    run()

    return () => clearInterval(stepTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-[720px]">
      <AssessmentProgress step={2} />
      <GlassCard className="p-10 flex flex-col items-center text-center">
        <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-violet/10 animate-breathe" />
          <div className="absolute inset-3 rounded-full bg-violet/15 animate-breathe" style={{ animationDelay: '0.4s' }} />
          <svg width="70" height="90" viewBox="0 0 70 90" fill="none" className="relative">
            <ellipse cx="35" cy="14" rx="12" ry="13" fill="#6D5DFB" />
            <rect x="20" y="28" width="30" height="42" rx="12" fill="#6D5DFB" opacity="0.85" />
            <rect x="10" y="32" width="10" height="34" rx="5" fill="#6D5DFB" opacity="0.7" />
            <rect x="50" y="32" width="10" height="34" rx="5" fill="#6D5DFB" opacity="0.7" />
          </svg>
        </div>
        <h1 className="display text-xl font-semibold mb-2">Analyzing your movement</h1>
        <p className="text-sm text-ink-soft mb-8">This takes a few seconds — all done on your device.</p>

        <div className="w-full flex flex-col gap-3 text-left max-w-[380px]">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                  i < stepIndex ? 'bg-mint text-white' : i === stepIndex ? 'bg-violet text-white' : 'bg-white/60 text-ink-soft'
                }`}
              >
                {i < stepIndex ? '✓' : i + 1}
              </div>
              <span className={`text-sm ${i <= stepIndex ? 'text-ink' : 'text-ink-soft'}`}>{s}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}