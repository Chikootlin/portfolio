import { IconType } from "react-icons"

type AboutCardProps = {
    icon: IconType
    text: string
}

export default function AboutCard({ icon: Icon, text }: AboutCardProps) {

    return (

        <div
            className="
            bg-[#454B6B]
            rounded-2xl
            border border-[#7EA2C7]
            hover:scale-105
            transition

            h-full
            flex
            flex-col
            "
        >

            {/* ICON */}
            <div className="flex justify-center pt-6">

                <Icon
                    className="
                    text-4xl
                    sm:text-5xl
                    md:text-6xl
                    "
                />

            </div>


            {/* TEXT */}

            <div className="p-4 md:p-6 flex-1 flex items-center">

                <p
                    className="
                    text-sm
                    sm:text-base
                    leading-relaxed
                    text-center
                    drop-shadow-[0_2px_4px_#6DAFC2]
                    "
                >
                    {text}
                </p>

            </div>

        </div>

    )
}