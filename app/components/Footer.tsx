import Link from "next/link"

const founders = [
  { name: "Danny Beck", linkedin: "https://www.linkedin.com/in/dannybeck/" },
  { name: "Michael Niczyporuk", linkedin: "https://www.linkedin.com/in/michael-niczyporuk/" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-4 px-6">
      <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
        {founders.map((founder) => (
          <Link
            key={founder.name}
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-paygent-green-700 transition-colors duration-200"
          >
            {founder.name}
          </Link>
        ))}
      </div>
    </footer>
  )
}

