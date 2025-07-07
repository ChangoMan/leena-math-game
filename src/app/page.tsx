'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [num1, setNum1] = useState<number>(0)
  const [num2, setNum2] = useState<number>(0)
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [feedback, setFeedback] = useState<string>('')
  const [backgroundColor, setBackgroundColor] = useState<string>('bg-gray-800')

  // Generate random numbers between 0 and 10
  const generateNewProblem = () => {
    setNum1(Math.floor(Math.random() * 11))
    setNum2(Math.floor(Math.random() * 11))
    setUserAnswer('')
    setFeedback('')
    setBackgroundColor('bg-gray-800')
  }

  // Initialize with a new problem
  useEffect(() => {
    generateNewProblem()
  }, [])

  const checkAnswer = () => {
    const correctAnswer = num1 + num2
    const userNum = parseInt(userAnswer)

    if (userNum === correctAnswer) {
      setFeedback('Correct! 🎉')
      setBackgroundColor('bg-green-200')
      // Generate new problem after 2 seconds
      setTimeout(() => {
        generateNewProblem()
      }, 2000)
    } else {
      setFeedback('Try again! ❌')
      setBackgroundColor('bg-red-200')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userAnswer.trim() !== '') {
      checkAnswer()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkAnswer();
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${backgroundColor}`}
    >
      <div className="bg-gray-700 rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Math Game
        </h1>

        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-white mb-4">
            {num1} + {num2} = ?
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your answer"
              className="w-full px-4 py-3 text-2xl text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors font-bold"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors text-xl"
          >
            Check Answer
          </button>
        </form>

        {feedback && (
          <div className="mt-6 text-center">
            <p className="text-2xl font-bold text-white">{feedback}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={generateNewProblem}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            New Problem
          </button>
        </div>
      </div>
    </div>
  )
}
