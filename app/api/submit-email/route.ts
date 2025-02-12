import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
  }

  try {
    const { error } = await supabase.from("waitlist_emails").insert([{ email }])

    if (error) throw error

    return NextResponse.json({ success: true, message: "Thank you for joining our waitlist!" })
  } catch (error) {
    console.error("Error submitting email:", error)
    return NextResponse.json({ success: false, message: "An error occurred. Please try again." }, { status: 500 })
  }
}

