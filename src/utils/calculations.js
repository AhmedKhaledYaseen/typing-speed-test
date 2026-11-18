/**
 * Calculates Words Per Minute (WPM)
 * Standard formula: (correct characters / 5) / (elapsed minutes)
 * Guarded against division by zero and negative elapsed time.
 */
export function calculateWpm(correctChars, elapsedSeconds) {
  if (elapsedSeconds <= 0 || correctChars <= 0) return 0
  const minutes = elapsedSeconds / 60
  return Math.round((correctChars / 5) / minutes)
}

/**
 * Calculates Accuracy Percentage
 * Formula: (correct characters / (correct characters + error count)) * 100
 * Guarded against division by zero (defaults to 100% when nothing typed).
 * Permanent errors on corrected mistakes are preserved via errorCount.
 */
export function calculateAccuracy(correctChars, errorCount) {
  const totalAttempted = correctChars + errorCount
  if (totalAttempted <= 0) return 100
  return Math.max(0, Math.round((correctChars / totalAttempted) * 100))
}
