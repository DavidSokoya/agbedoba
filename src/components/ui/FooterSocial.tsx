"use client"

type FooterSocialProps = {
    href: string,
    icon: any
}

export default function FooterSocial({ href, icon }: FooterSocialProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition text-white">
      {icon}
    </a>
  )
}