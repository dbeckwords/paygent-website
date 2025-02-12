"use client"

import { useState, type React } from "react"

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export default function EmailForm() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showValidationError, setShowValidationError] = useState(false)

  const validateEmail = (email: string) => {
    return EMAIL_REGEX.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    if (showValidationError) {
      setShowValidationError(!validateEmail(newEmail))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateEmail(email)) {
      setShowValidationError(true)
      return
    }

    setIsLoading(true)
    setMessage("")
    setShowValidationError(false)

    try {
      const response = await fetch("/api/submit-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      setIsSuccess(data.success)
      setMessage(data.message)

      if (data.success) {
        setEmail("")
      } else {
        console.error("Submission failed:", data.message)
      }
    } catch (error) {
      console.error("Error submitting email:", error)
      setIsSuccess(false)
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex items-center border-b border-green-700 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          aria-label="Email address"
        />
        <button
          className="flex-shrink-0 bg-green-700 hover:bg-green-800 border-green-700 hover:border-green-800 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
      {showValidationError && <p className="mt-2 text-sm text-red-600">Please enter a valid email address.</p>}
      {message && !showValidationError && (
        <p className={`mt-2 text-sm ${isSuccess ? "text-green-600" : "text-red-600"}`}>{message}</p>
      )}
    </form>
  )
}

