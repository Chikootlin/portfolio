import { IconType } from "react-icons"

type AboutCardProps = {
    icon: IconType,
    text: string
}

export default function AboutCard({icon: Icon, text}:AboutCardProps){
    return(
        <>
            <div className="bg-[#454B6B] rounded-2xl overflow-hidden border border-[#7EA2C7] max-w-70 hover:scale-108 transition">
                {/* Image */}
                <div className="flex justify-center items-center pt-10">
                    <Icon className="text-7xl"></Icon>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-md leading-relaxed text-center drop-shadow-[0_2px_4px_#6DAFC2] max-w-55 mx-auto">
                        {text}
                    </p>
                </div>
            </div>
        </>
    )
}