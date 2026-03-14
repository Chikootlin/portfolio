type AchievementCardProps = {
    title: string
    rank: string
    year: number
    category: string
    team: string
    organizer: string
}

export default function AchievementCard({ title, rank, year, category, team, organizer }: AchievementCardProps) {
    return (
        <>
            <div className="bg-[#454B6B] border border-[#7EA2C7] rounded-2xl p-6 hover:scale-110 transition">
                <h3 className="text-2xl font-bold drop-shadow-[0_2px_4px_#6DAFC2]">
                    {title}
                </h3>
                <p className="opacity-80 drop-shadow-[0_2px_4px_#6DAFC2]">
                    {rank} • {year}
                </p>
                <p className="text-sm mt-1 drop-shadow-[0_2px_4px_#6DAFC2]">
                    Category: {category}
                </p>
                <p className="text-sm drop-shadow-[0_2px_4px_#6DAFC2]">
                    Team: {team || "-"}
                </p>
                <p className="mt-2 drop-shadow-[0_2px_4px_#6DAFC2]">
                    Organizer: {organizer}
                </p>
            </div>
        </>
    )
}