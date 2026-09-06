import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { AssessmentProgress } from '../components/Layout'
import { symptomChips } from '../data/mock'

export default function NewAssessment() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>(['Lower back', 'Worse sitting'])
  const [pain, setPain] = useState(5)
  const [notes, setNotes] = useState('')

  function toggle(chip: string) {
    setSelected((s) => (s.includes(chip) ? s.filter((c) => c !== chip) : [...s, chip]))
  }

  return (
    <div className="max-w-[720px]">
      <AssessmentProgress step={0} />
      <h1 className="display text-2xl font-semibold mb-1">Tell us what's going on</h1>
      <p className="text-ink-soft text-sm mb-8">
        This narrows down what the image analysis should focus on — you don't have to get it perfectly right.
      </p>

      <Card className="p-7">
        <p className="text-sm font-semibold mb-3">Where and how does it show up?</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {symptomChips.map((chip) => {
            const active = selected.includes(chip)
            return (
              <button
                key={chip}
                onClick={() => toggle(chip)}
                className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                  active
                    ? 'bg-violet text-white border-violet'
                    : 'bg-canvas text-ink-soft border-line hover:bg-violet-tint'
                }`}
              >
                {chip}
              </button>
            )
          })}
        </div>

        <p className="text-sm font-semibold mb-3">How intense is the pain right now?</p>
        <div className="mb-8">
          <input
            type="range"
            min={0}
            max={10}
            value={pain}
            onChange={(e) => setPain(Number(e.target.value))}
            className="w-full accent-[#6D5DFB]"
          />
          <div className="flex justify-between text-xs text-ink-soft mt-1">
            <span>No pain</span>
            <span className="font-semibold text-violet-deep">{pain}/10</span>
            <span>Worst pain</span>
          </div>
        </div>

        <p className="text-sm font-semibold mb-3">Anything else worth mentioning?</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. it's worse after long shifts at my desk, started about 2 weeks ago..."
          rows={4}
          className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet/40 focus:bg-paper resize-none"
        />

        <div className="flex justify-end mt-8">
          <button
            onClick={() => navigate('/assessment/upload')}
            className="rounded-xl bg-violet text-white font-semibold px-6 py-3 text-sm shadow-[0_8px_20px_rgba(109,93,251,0.35)] hover:bg-violet-deep transition-colors"
          >
            Continue to photo
          </button>
        </div>
      </Card>
    </div>
  )
}