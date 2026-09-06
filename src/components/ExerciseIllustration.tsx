import type { FC } from 'react'


// Original line-art illustrations, one per exercise - drawn for this app so
// there's no stock-photo licensing to worry about, and they match the
// violet/line visual language used everywhere else.

function PelvicTiltSvg() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      {/* floor */}
      <line x1="8" y1="82" x2="112" y2="82" stroke="var(--color-line)" strokeWidth="2" />
      {/* lying figure: head, torso, bent legs */}
      <circle cx="24" cy="60" r="9" fill="var(--color-violet)" />
      <path d="M33 60 H70" stroke="var(--color-violet)" strokeWidth="8" strokeLinecap="round" />
      {/* bent thigh */}
      <path d="M70 60 L86 44" stroke="var(--color-violet)" strokeWidth="8" strokeLinecap="round" />
      {/* shin down to floor */}
      <path d="M86 44 L86 78" stroke="var(--color-violet)" strokeWidth="8" strokeLinecap="round" />
      {/* pelvic tilt motion arrow */}
      <path d="M55 46 q8 -10 18 -4" stroke="var(--color-mint)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M71 40 l3 3 l-4.5 1.5 Z" fill="var(--color-mint)" />
    </svg>
  )
}

function CatCowSvg() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <line x1="8" y1="86" x2="112" y2="86" stroke="var(--color-line)" strokeWidth="2" />
      {/* hands and knees pose - arched back */}
      <circle cx="30" cy="66" r="8" fill="var(--color-violet)" />
      <path d="M37 62 Q60 38 88 60" stroke="var(--color-violet)" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* front arm */}
      <path d="M32 70 L26 86" stroke="var(--color-violet)" strokeWidth="7" strokeLinecap="round" />
      {/* back leg */}
      <path d="M86 62 L96 86" stroke="var(--color-violet)" strokeWidth="7" strokeLinecap="round" />
      {/* motion arrows for the arch */}
      <path d="M50 34 q10 -8 20 0" stroke="var(--color-mint)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M50 50 q10 8 20 0" stroke="var(--color-amber)" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="3 3" />
    </svg>
  )
}

function KneeToChestSvg() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <line x1="8" y1="82" x2="112" y2="82" stroke="var(--color-line)" strokeWidth="2" />
      {/* lying figure with knee pulled to chest */}
      <circle cx="22" cy="58" r="9" fill="var(--color-violet)" />
      <path d="M31 58 H58" stroke="var(--color-violet)" strokeWidth="8" strokeLinecap="round" />
      {/* pulled-up thigh + shin folded to chest */}
      <path d="M58 58 L78 40" stroke="var(--color-violet)" strokeWidth="8" strokeLinecap="round" />
      <path d="M78 40 L58 34" stroke="var(--color-violet)" strokeWidth="8" strokeLinecap="round" />
      {/* arms hugging the knee */}
      <path d="M44 54 L68 42" stroke="var(--color-violet)" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      {/* other leg flat on floor */}
      <path d="M58 58 L96 58" stroke="var(--color-violet)" strokeWidth="8" strokeLinecap="round" opacity="0.55" />
      <path d="M40 30 q6 -6 14 -2" stroke="var(--color-mint)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M53 27 l3 3 l-4.5 1 Z" fill="var(--color-mint)" />
    </svg>
  )
}

function DeskBreakSvg() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      {/* simple standing stretch figure beside a desk */}
      <rect x="70" y="58" width="34" height="6" rx="2" fill="var(--color-line)" />
      <line x1="74" y1="64" x2="74" y2="82" stroke="var(--color-line)" strokeWidth="4" />
      <line x1="100" y1="64" x2="100" y2="82" stroke="var(--color-line)" strokeWidth="4" />
      <circle cx="32" cy="26" r="9" fill="var(--color-violet)" />
      <path d="M32 35 V64" stroke="var(--color-violet)" strokeWidth="8" strokeLinecap="round" />
      <path d="M32 44 L14 34" stroke="var(--color-violet)" strokeWidth="6" strokeLinecap="round" />
      <path d="M32 44 L50 30" stroke="var(--color-violet)" strokeWidth="6" strokeLinecap="round" />
      <path d="M32 64 L20 84" stroke="var(--color-violet)" strokeWidth="7" strokeLinecap="round" />
      <path d="M32 64 L44 84" stroke="var(--color-violet)" strokeWidth="7" strokeLinecap="round" />
    </svg>
  )
}

function GenericStretchSvg() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <line x1="8" y1="82" x2="112" y2="82" stroke="var(--color-line)" strokeWidth="2" />
      <circle cx="60" cy="30" r="9" fill="var(--color-violet)" />
      <path d="M60 39 V70" stroke="var(--color-violet)" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 48 L40 38" stroke="var(--color-violet)" strokeWidth="6" strokeLinecap="round" />
      <path d="M60 48 L80 38" stroke="var(--color-violet)" strokeWidth="6" strokeLinecap="round" />
      <path d="M60 70 L46 82" stroke="var(--color-violet)" strokeWidth="7" strokeLinecap="round" />
      <path d="M60 70 L74 82" stroke="var(--color-violet)" strokeWidth="7" strokeLinecap="round" />
    </svg>
  )
}

const illustrations: Record<string, FC> = {
  'Pelvic Tilt': PelvicTiltSvg,
  'Cat-Cow Stretch': CatCowSvg,
  'Knee to Chest': KneeToChestSvg,
  'Desk break routine': DeskBreakSvg,
}

export function ExerciseIllustration({ name, className = '' }: { name: string; className?: string }) {
  const Illustration = illustrations[name] ?? GenericStretchSvg
  return (
    <div className={className}>
      <Illustration />
    </div>
  )
}