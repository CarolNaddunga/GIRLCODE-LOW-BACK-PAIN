type Props = {
  value: number // 0-100
  size?: number
  stroke?: number
  color?: string
  trackColor?: string
  label?: string
  sublabel?: string
}

export default function RingGauge({
  value,
  size = 132,
  stroke = 10,
  color = 'var(--color-violet)',
  trackColor = 'rgba(109,93,251,0.12)',
  label,
  sublabel,
}: Props) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (Math.max(0, Math.min(100, value)) / 100) * c

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        {label && <span className="display font-semibold text-ink text-xl leading-none">{label}</span>}
        {sublabel && <span className="text-[11px] text-ink-soft mt-1 leading-tight max-w-[80px]">{sublabel}</span>}
      </div>
    </div>
  )
}