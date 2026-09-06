import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Check, RotateCcw } from 'lucide-react'
import { Card } from '../components/Card'
import { ImagePlaceholder } from '../components/ImagePlaceholder'
import pelvicTiltImg from '../images.jpg'

import catCowImg from '../catpose.jpg'         
import kneeToChestImg from '../knee.jpg' 

const exerciseImages: Record<string, string> = {
  'Pelvic Tilt': pelvicTiltImg,
   'Cat-Cow Stretch': catCowImg,
   'Knee to Chest': kneeToChestImg,
}

const exerciseInstructions: Record<string, string> = {
  'Pelvic Tilt':
    'Lie on your back, knees bent. Gently flatten your lower back against the floor by tightening your stomach muscles, hold 5 seconds, then release.',
  'Cat-Cow Stretch':
    'Start on hands and knees. Inhale, drop your belly and lift your chest and tailbone (cow). Exhale, round your spine toward the ceiling, tucking chin and tailbone (cat). Move slowly between the two.',
  'Knee to Chest':
    'Lie on your back with both knees bent. Pull one knee toward your chest with both hands, holding gently for a few seconds, keeping your lower back flat on the floor, then switch legs.',
}

export default function Exercise() {
  const navigate = useNavigate()
  const location = useLocation()
  const exerciseName = (location.state as { exercise?: string } | null)?.exercise ?? 'Pelvic Tilt'
  const totalSets = 3
  const [set, setSet] = useState(1)
  const [done, setDone] = useState(false)
  const image = exerciseImages[exerciseName]

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

      <Card className="p-10 flex flex-col items-center text-center">
        {!done ? (
          <>
            {image ? (
              <img
                src={image}
                alt={`Demonstration of the ${exerciseName} exercise`}
                className="w-48 h-48 mb-8 rounded-2xl object-cover"
              />
            ) : (
              <ImagePlaceholder label={`Add ${exerciseName} demo photo`} className="w-48 h-48 mb-8" />
            )}
            <p className="text-sm text-ink-soft mb-8 max-w-[380px]">
              {exerciseInstructions[exerciseName] ?? exerciseInstructions['Pelvic Tilt']}
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
            <div className="w-16 h-16 rounded-full bg-mint/15 flex items-center justify-center mb-5">
              <Check size={28} className="text-mint" />
            </div>
            <h2 className="display text-xl font-semibold mb-2">Nice work!</h2>
            <p className="text-sm text-ink-soft mb-8">You completed all {totalSets} sets of {exerciseName}.</p>
            <div className="flex gap-3">
              <button
                onClick={() => { setSet(1); setDone(false) }}
                className="rounded-xl border border-line px-5 py-3 text-sm font-semibold flex items-center gap-2 hover:bg-canvas transition-colors"
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
      </Card>
    </div>
  )
}