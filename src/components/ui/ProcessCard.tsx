"use client"

type ProcessCardProps = {
    number: string,
    icon: any,
    title: string,
    desc: string,
    color: string
}

export default function ProcessCard({ number, icon, title, desc, color }: ProcessCardProps) {
  return (
    <div className="relative group p-6 md:p-8 bg-white border border-gray-100 rounded-3xl hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition duration-300">
      <div className={`w-12 h-12 md:w-14 md:h-14 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition`}>
        {icon}
      </div>
      <h3 className="text-3xl md:text-4xl font-bold text-gray-100 absolute top-4 right-6 select-none">{number}</h3>
      <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2 relative z-10">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed relative z-10">
        {desc}
      </p>
    </div>
  )
}