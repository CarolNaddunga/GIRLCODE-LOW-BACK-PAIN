// Brand mark: a plumb line, the reference physios use to read posture
// against — a fixed point, a straight vertical, and where the body departs
// from it. Ties the mark to what the product actually measures.
export function LogoMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="2.6" r="1.6" fill="white" />
      <line x1="9" y1="4.6" x2="9" y2="12" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 12 L6.2 15.6 M9 12 L11.8 15.6" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="4.5" y1="9" x2="6.4" y2="9" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" />
    </svg>
  )
}

export default function Logo({ withWordmark = true }: { withWordmark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl bg-violet flex items-center justify-center shadow-[0_6px_16px_rgba(109,93,251,0.35)]">
        <LogoMark />
      </div>
      {withWordmark && <span className="display font-semibold text-lg text-ink">BakPose</span>}
    </div>
  )
}