type AchievementCardProps = {
    title: string
    rank: string
    year: number
    category: string
    team: string
    organizer: string
}

export default function AchievementCard({
    title,
    rank,
    year,
    category,
    team,
    organizer,
}: AchievementCardProps) {
    return (
        <div
            className="
            bg-[#454B6B]
            border border-[#7EA2C7]
            rounded-2xl
            p-4 md:p-6
            transition
            hover:scale-105
            "
        >
            <h3
                className="
                text-lg md:text-2xl
                font-bold
                drop-shadow-[0_2px_4px_#6DAFC2]
                "
            >
                {title}
            </h3>

            <p
                className="
                opacity-80
                text-sm md:text-base
                drop-shadow-[0_2px_4px_#6DAFC2]
                "
            >
                {rank} • {year}
            </p>

            <p
                className="
                text-xs md:text-sm
                mt-1
                drop-shadow-[0_2px_4px_#6DAFC2]
                "
            >
                Category: {category}
            </p>

            <p
                className="
                text-xs md:text-sm
                drop-shadow-[0_2px_4px_#6DAFC2]
                "
            >
                Team: {team || "-"}
            </p>

            <p
                className="
                mt-2
                text-xs md:text-sm
                drop-shadow-[0_2px_4px_#6DAFC2]
                "
            >
                Organizer: {organizer}
            </p>
        </div>
    )
}