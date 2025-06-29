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
  const alarmAudioRef = useRef<HTMLAudioElement | null>(null)
  const startTimeRef = useRef<number>(0)

   // Audio einmal laden
  useEffect(() => {
    alarmAudioRef.current = new Audio("sounds/timerendmelodie.mp3")
    alarmAudioRef.current.load()
  }, [])



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
          alarmAudioRef.current!.currentTime = 0
          alarmAudioRef.current?.play().catch(console.error)
        }
      }, 50)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [state, totalSeconds])

  const startTimer = () => {
    const mins = parseInt(minutes) || 0
    const secs = parseInt(seconds) || 0
    const total = mins * 60 + secs

    if (total > 0 && total <= 3600) {
      setTotalSeconds(total)
      setRemainingSeconds(total)
      alarmAudioRef.current?.play()
    .then(() => alarmAudioRef.current!.pause())
    .catch(() => {/* ignore */})
 
      setState("running")
      // kein Start-Ton mehr
    }
  }

  const pauseTimer = () => {
    setState("paused")
    // Update totalSeconds to current remaining time for resume
    setTotalSeconds(remainingSeconds)
  }

  const resumeTimer = () => {
    setState("running")
  }

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
     // Stoppe und setze den Alarm zurück
 alarmAudioRef.current?.pause()
alarmAudioRef.current!.currentTime = 0
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
      <div className="max-w-md mx-auto">
        {/* Analog Clock */}
         <div className="mb-8 w-full flex justify-center">
          <AnalogClock
            totalSeconds={totalSeconds}
            remainingSeconds={state === "setup" ? 0 : remainingSeconds}
            isActive={state === "running" || state === "paused"}
            showPointer={true} // Always show pointer
          />
        </div>

        {/* Setup Screen */}
        {state === "setup" && (
          <div className="space-y-6">
            {/* Manual Input */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="minutes" className="text-sm text-gray-300 mb-2 block">
                    Minuten
                  </Label>
                  <Input
                    id="minutes"
                    type="number"
                    min="0"
                    max="60"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white text-lg text-center"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="seconds" className="text-sm text-gray-300 mb-2 block">
                    Sekunden
                  </Label>
                  <Input
                    id="seconds"
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white text-lg text-center"
                    placeholder="0"
                  />
                </div>
              </div>
              <Button
                onClick={startTimer}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl"
                disabled={!minutes && !seconds}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Timer
              </Button>
            </div>

            {/* Preset Buttons */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-3">
                {[5, 10, 15, 20].map((mins) => (
                  <Button
                    key={mins}
                    onClick={() => setPresetTime(mins)}
                    variant="outline"
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 py-3 rounded-xl font-medium"
                  >
                    {mins} min
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

{/* Running/Paused Timer Screen */}
{(state === "running" || state === "paused") && (
  <div className="space-y-6">
    {/* Digital Countdown */}
    <div className="text-center">
      <div className="text-6xl font-bold text-blue-400 mb-2 font-mono">
        {formatTime(remainingSeconds)}
      </div>
      <p className="text-gray-400">
        {state === "running" ? "Timer läuft..." : "Timer pausiert"}
      </p>
    </div>

    {/* Control Buttons */}
    <div className="flex gap-3 justify-center">
      {state === "running" ? (
        <Button
          onClick={pauseTimer}
          className="border border-yellow-500 text-yellow-500 hover:bg-yellow-900/10 px-6 py-3 rounded-xl bg-transparent"
        >
          <Pause className="w-5 h-5 mr-2" />
          Pause
        </Button>
      ) : (
        <Button
          onClick={resumeTimer}
          className="border border-green-500 text-green-500 hover:bg-green-900/10 px-6 py-3 rounded-xl bg-transparent"
        >
          <Play className="w-5 h-5 mr-2" />
          Weiter
        </Button>
      )}
      <Button
        onClick={stopTimer}
        className="border border-red-500 text-red-500 hover:bg-red-900/10 px-6 py-3 rounded-xl bg-transparent"
      >
        <Square className="w-5 h-5 mr-2" />
        Stopp
      </Button>
    </div>
  </div>
)}



        {/* Finished Screen */}
        {state === "finished" && (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-green-400">Zeit ist vorbei!</h2>
            <Button
              onClick={resetTimer}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Starte einen neuen Timer
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}


