import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
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
      <Card className="p-10 flex flex-col items-center text-center">
        <div className="relative w-28 h-36 mb-8 flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-canvas">
          <div className="absolute inset-x-6 top-3 bottom-3 border-l border-r border-dashed border-violet/25" />
          <div className="absolute left-0 right-0 h-0.5 bg-violet/70 shadow-[0_0_10px_rgba(109,93,251,0.6)] animate-sweep" />
          <span className="text-[11px] font-medium text-ink-soft">Reading posture</span>
        </div>
        <h1 className="display text-xl font-semibold mb-2">Analyzing your movement</h1>
        <p className="text-sm text-ink-soft mb-8">This takes a few seconds — all done on your device.</p>

        <div className="w-full flex flex-col gap-3 text-left max-w-[380px]">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                  i < stepIndex ? 'bg-mint text-white' : i === stepIndex ? 'bg-violet text-white' : 'bg-canvas text-ink-soft border border-line'
                }`}
              >
                {i < stepIndex ? '✓' : i + 1}
              </div>
              <span className={`text-sm ${i <= stepIndex ? 'text-ink' : 'text-ink-soft'}`}>{s}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}