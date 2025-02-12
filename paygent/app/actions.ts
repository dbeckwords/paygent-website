"use server"

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function submitEmail(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return { success: false, message: "Email is required" }
  }

  try {
    const { error } = await supabase.from("waitlist_emails").insert([{ email }])

    if (error) throw error

    return { success: true, message: "Thank you for joining our waitlist!" }
  } catch (error) {
    console.error("Error submitting email:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}

