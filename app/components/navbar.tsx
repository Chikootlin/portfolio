"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar(){
    const pathname = usePathname()
    const linkClass = (path: string) => pathname == path ? "text-[#A6E3F1] font-semibold" : "hover:text-[#A6E3F1]"

    return (
        <>
            <nav className="fixed top-4 md:top-10 left-1/2 -translate-x-1/2 bg-[#50577C] backdrop-blur-lg shadow-lg rounded-2xl px-4 md:px-14 py-2 md:py-3 flex gap-4 md:gap-12 z-50 border border-[#6DAFC2] text-[10px] md:text-base max-w-[95vw] overflow-x-auto">
                <Link href={"/"} className={`flex whitespace-nowrap drop-shadow-[0_2px_4px_#6DAFC2] items-center gap-2 ${linkClass("/")}`}>
                    Home
                </Link>
                <Link href={"/blog"} className={`flex whitespace-nowrap drop-shadow-[0_2px_4px_#6DAFC2] items-center gap-2 ${linkClass("/blog")}`}>
                    Blogs
                </Link>

                <Link href={"/achievement"} className={`flex whitespace-nowrap drop-shadow-[0_2px_4px_#6DAFC2] items-center gap-2 ${linkClass("/achievement")}`}>
                    Achievements
                </Link>

                <Link href={"/project"} className={`flex whitespace-nowrap drop-shadow-[0_2px_4px_#6DAFC2] items-center gap-2 ${linkClass("/project")}`}>
                    Projects
                </Link>
            </nav>
        </>
    )
}