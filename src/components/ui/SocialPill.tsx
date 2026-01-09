"use client"

type SocialPillProps = {
    href: string,
    icon: any,
    label: string
}

export default function SocialPill({ href, icon, label }: SocialPillProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition">
      {icon}
      {label}
    </a>
  )
}