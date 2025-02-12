import Image from "next/image"
import EmailForm from "./components/EmailForm"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-3 flex items-center">
        <div className="w-12 h-12 -ml-1 -my-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20(1)-ur8st9b8Z7zgL8g2SwQO01ObhpiHF1.png"
            alt="Paygent Logo"
            width={48}
            height={48}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </header>
      <main className="flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            The Payments and Commerce Platform for AI Agents
          </h1>
          <p className="text-base leading-relaxed text-gray-600">
            A suite of products for AI Agent builders and Merchants built on a foundation of financial-institution grade
            identity, security, compliance and privacy, ensuring trustworthy AI-driven transactions.
          </p>
        </div>
        <div className="w-full md:w-1/2 bg-green-50 p-6 md:p-12 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Join our Waitlist</h2>
          <EmailForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}

