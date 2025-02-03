import React, { useState } from "react"
import { Progress } from "@/components/ui/progress"

export function CenteredProgressBar(props: { isVisible: boolean, filename: string | null }) {
  const [progress, setProgress] = useState(0)

  // Simulate progress
  const simulateProgress = () => {
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 80) {
          clearInterval(timer)
          return 80
        }
        const newProgress = oldProgress + 10
        return Math.min(newProgress, 80)
      })
    }, 500)
  }

  React.useEffect(() => {
    if (props.isVisible) {
      simulateProgress()
    }
  }, [props.isVisible])

  return (
    <>
      {props.isVisible && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="w-full max-w-md space-y-4">
            <>
              <Progress value={progress} className="w-full" />
              <h1 className="text-center">Uploading {props.filename}</h1>
            </>
          </div>
        </div>
      )}
    </>
  )
}

