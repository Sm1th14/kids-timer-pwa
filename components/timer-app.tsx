"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Pause, Square, RotateCcw } from "lucide-react"
import AnalogClock from "./analog-clock"

type TimerState = "setup" | "running" | "paused" | "finished"

export default function TimerApp() {
  const [state, setState] = useState<TimerState>("setup")
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const startTimeRef = useRef<number>(0)

  // Neuer Ref für deinen MP3-Alarm
  const alarmAudioRef = useRef<HTMLAudioElement>(
    typeof Audio !== "undefined"
      ? new Audio("/sounds/timerendmelodie.mp3")
      : (null as any)
  )

  // Initialize audio context (für die kurzen Töne, optional)
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  // Du kannst playTone weiter für Start-Töne nutzen, bleibt so

  const playTone = (frequency: number, duration: number) => {
    if (!audioContextRef.current) return
    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    oscillator.type = "sine"
    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration)
    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration)
  }

  // Timer logic
  useEffect(() => {
    if (state === "running") {
      startTimeRef.current = Date.now()
      intervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000
        const newRemaining = Math.max(0, totalSeconds - elapsed)
        setRemainingSeconds(newRemaining)

        if (newRemaining <= 0) {
          setState("finished")
          // Hier wird deine MP3 abgespielt:
          alarmAudioRef.current.volume = 0.5
          alarmAudioRef.current.play().catch(console.error)
        }
      }, 50)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [state, totalSeconds])

  const startTimer = () => {
    const mins = Number.parseInt(minutes) || 0
    const secs = Number.parseInt(seconds) || 0
    const total = mins * 60 + secs
    if (total > 0 && total <= 3600) {
      setTotalSeconds(total)
      setRemainingSeconds(total)
      setState("running")
      playTone(600, 0.2) // kurzer Start-Ton
    }
  }

  // … restliche Funktionen unverändert …

  const pauseTimer = () => {
    setState("paused")
    setTotalSeconds(remainingSeconds)
  }
  const resumeTimer = () => setState("running")
  const stopTimer = () => {
    setState("setup")
    setRemainingSeconds(0)
    setTotalSeconds(0)
  }
  const resetTimer = () => {
    setState("setup")
    setRemainingSeconds(0)
    setTotalSeconds(0)
    setMinutes("")
    setSeconds("")
  }
  const setPresetTime = (mins: number) => {
    setMinutes(mins.toString())
    setSeconds("0")
  }
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60)
    const secs = Math.floor(totalSecs % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* … dein JSX bleibt exakt gleich … */}
    </div>
  )
}
