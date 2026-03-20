import Image from "next/image"
import { FaCalendar } from "react-icons/fa"

type Project = {
    id: string
    title: string
    description: string
    date: string
    image: string
}

export default function ProjectCard({ project }: { project: Project }) {
    const title = project.title
    const desc = project.description
    const image = project.image || "/images/earth.jpg"

    let date = ""
    if (project.date) {
        const d = new Date(project.date)
        const month = d.toLocaleString("en-US", { month: "long" })
        const day = d.getDate()
        const year = d.getFullYear()
        date = `${month}, ${day} ${year}`
    }

    return (
        <>
            <div className="relative group">
                <div className="bg-[#454B6B] rounded-2xl overflow-hidden border border-[#7EA2C7] transition-transform hover:scale-105 group">
                    {/* image */}
                    <div className="relative h-36 sm:h-40 md:h-44">
                        <Image
                            src={image}
                            alt="project"
                            fill
                            className="object-cover object-[center_top]"
                        />
                    </div>

                    {/* content */}
                    <div className="p-4 md:p-6">
                        <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 drop-shadow-[0_2px_4px_#6DAFC2]">
                            {title}
                        </h3>
                        <div className="overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-96 ">
                            <p className="text-gray-300 text-sm leading-relaxed line-clamp-4 group-hover:line-clamp-none">
                                {desc}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mt-4 md:mt-6">
                            <FaCalendar />
                            <span>{date}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}