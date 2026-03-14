"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
// import { FaHome, FaArchive, FaTrophy, FaFolderOpen } from "react-icons/fa"

export default function Navbar(){
    const pathname = usePathname()

    const linkClass = (path: string) => pathname == path ? "text-[#A6E3F1] font-semibold" : "hover:text-[#A6E3F1]"

    return (
        <>
            <nav className="fixed top-10 left-1/2 -translate-x-1/2 bg-[#50577C] backdrop-blur-lg shadow-lg rounded-2xl px-14 py-3 flex space-x-12 z-50 border border-[#6DAFC2]">
                <Link href={"/"} className={`flex drop-shadow-[0_2px_4px_#6DAFC2] items-center gap-2 ${linkClass("/")}`}>
                {/* <FaHome></FaHome> */}
                Home
                </Link>
                <Link href={"/blog"} className={`flex drop-shadow-[0_2px_4px_#6DAFC2] items-center gap-2 ${linkClass("/blog")}`}>
                {/* <FaArchive></FaArchive> */}
                Blogs
                </Link>
                <Link href={"/achievement"} className={`flex drop-shadow-[0_2px_4px_#6DAFC2] items-center gap-2 ${linkClass("/achievement")}`}>
                {/* <FaTrophy></FaTrophy> */}
                Achievements
                </Link>
                <Link href={"/project"} className={`flex drop-shadow-[0_2px_4px_#6DAFC2] items-center gap-2 ${linkClass("/project")}`}>
                {/* <FaFolderOpen></FaFolderOpen> */}
                Projects
                </Link>
            </nav>
        </>
    )
}