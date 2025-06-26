"use client"

interface AnalogClockProps {
  totalSeconds: number
  remainingSeconds: number
  isActive: boolean
  showPointer?: boolean
}

export default function AnalogClock({
  totalSeconds,
  remainingSeconds,
  isActive,
  showPointer = false,
}: AnalogClockProps) {
  const radius = 160
  const centerX = 190
  const centerY = 190

  // Calculate angles (0 degrees = 12 o'clock, clockwise)
  // For setup screen, show pointer at 12 o'clock
  const remainingAngle = isActive ? (remainingSeconds / 3600) * 360 : 0

  // Calculate hand positions
  const handX = centerX + radius * 0.8 * Math.sin((remainingAngle * Math.PI) / 180)
  const handY = centerY - radius * 0.8 * Math.cos((remainingAngle * Math.PI) / 180)

  // Create arc path for remaining time highlight
  const createArcPath = () => {
    if (remainingAngle === 0) return ""

    const startAngle = 0 // 12 o'clock yeah
    const endAngle = remainingAngle

    const startX = centerX + radius * Math.sin((startAngle * Math.PI) / 180)
    const startY = centerY - radius * Math.cos((startAngle * Math.PI) / 180)
    const endX = centerX + radius * Math.sin((endAngle * Math.PI) / 180)
    const endY = centerY - radius * Math.cos((endAngle * Math.PI) / 180)

    const largeArcFlag = endAngle > 180 ? 1 : 0

    return `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`
  }

  return (
    <div className="flex justify-center">
      <svg width="380" height="380" className="drop-shadow-2xl">
        {/* Clock face */}
        <circle cx={centerX} cy={centerY} r={radius} fill="#1f2937" stroke="#374151" strokeWidth="4" />

        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const x1 = centerX + (radius - 20) * Math.sin(angle)
          const y1 = centerY - (radius - 20) * Math.cos(angle)
          const x2 = centerX + (radius - 8) * Math.sin(angle)
          const y2 = centerY - (radius - 8) * Math.cos(angle)

          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6b7280" strokeWidth="3" />
        })}

        {/* 12 o'clock special marker */}
        <circle cx={centerX} cy={centerY - radius + 14} r="6" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" />

        {/* Remaining time highlight */}
        {isActive && remainingAngle > 0 && (
          <path d={createArcPath()} fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="3" />
        )}

        {/* Timer hand - always show, at 12 o'clock in setup */}
        <line
          x1={centerX}
          y1={centerY}
          x2={handX}
          y2={handY}
          stroke="#ef4444"
          strokeWidth="6"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
          }}
        />
        <circle cx={handX} cy={handY} r="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />

        {/* Center dot */}
        <circle cx={centerX} cy={centerY} r="12" fill="#374151" stroke="#6b7280" strokeWidth="3" />

        {/* All numbers 1-12 */}
        {[...Array(12)].map((_, i) => {
          const num = i === 0 ? 12 : i
          const angle = (i * 30 * Math.PI) / 180
          const x = centerX + (radius - 35) * Math.sin(angle)
          const y = centerY - (radius - 35) * Math.cos(angle) + 7

          return (
            <text key={num} x={x} y={y} textAnchor="middle" className="text-lg font-bold fill-gray-300">
              {num}
            </text>
          )
        })}

        {/* Minute dots around the clock */}
        {[...Array(60)].map((_, i) => {
          if (i % 5 !== 0) {
            // Skip positions where numbers are
            const angle = (i * 6 * Math.PI) / 180
            const x = centerX + (radius - 12) * Math.sin(angle)
            const y = centerY - (radius - 12) * Math.cos(angle)

            return <circle key={i} cx={x} cy={y} r="1.5" fill="#64748b" />
          }
          return null
        })}
      </svg>
    </div>
  )
}
