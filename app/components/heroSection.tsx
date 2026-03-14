"use client"

import Image from "next/image";
import { FiGithub, FiLinkedin} from "react-icons/fi"
import { FaDiscord } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
// import { getPosts } from "@/lib/getPosts";

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection(){
    // const posts = getPosts()
    // console.log(posts)
    const containerRef = useRef(null)
    // const textRef = useRef(null)
    const imageRef = useRef(null)
    const textRef = useRef<HTMLHeadingElement | null>(null)
    const decRef = useRef<HTMLParagraphElement | null>(null)
    const linkRef = useRef(null)
    
    const typeText = (element: HTMLElement, speed = 0.05) => {
        const text = element.innerText

        const letters = text.split("")

        element.innerHTML = letters
            .map(x => `<span class="char">${x}</span>`)
            .join("")

        const chars = element.querySelectorAll(".char")

        gsap.from(chars, {
            opacity: 0,
            stagger: speed,
            duration: 0.2
        })
    }

    useGSAP(() => {

        const el1 = textRef.current
        const el2 = decRef.current

        //type animation
        if (el1) typeText(el1, 0.08)
        if (el2) typeText(el2, 0.01)

        //load animation
        const tlLoad = gsap.timeline()
        tlLoad
            .from(imageRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
            })
            .from(textRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
            }, "<")
            .from(decRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
            }, "<")
            .from(linkRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
            }, "<")

        //scroll animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
            }
        })

        tl.to(
            [
                textRef.current,
                imageRef.current,
                decRef.current,
                linkRef.current,
            ],
            {
                y: -300,
                opacity: 0,
            }
        ).to(
            containerRef.current,
            {
                y: 500,
            },
            "<"
        )

        ScrollTrigger.refresh()
    }, { scope: containerRef })

    return(
        <>
            <section ref={containerRef} className="relative min-h-screen bg-cover bg-center flex flex-col items-center py-40 justify-center" style={{backgroundImage: "url('/images/hero.webp')"}}>
                <div className="absolute inset-0 bg-[#3A3F5C]/86"></div>
                <div ref={imageRef} className="w-60 h-60 relative">
                    <Image src={`https://avatars.githubusercontent.com/u/183741237?v=4`} alt="profile" fill unoptimized className="rounded-full object-cover"/>
                </div>
                <div className="py-4">
                    <h1 ref={textRef} className="text-3xl font-extrabold drop-shadow-[0_2px_4px_#6DAFC2]">
                    MieAyamPerfect
                    </h1>
                </div>
                <div className="max-w-125 text-center drop-shadow-[0_2px_4px_#6DAFC2]">
                    <p ref={decRef}>
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec dolor non ante consequat blandit a eget lorem. */}
                        Digital forensics player. I recover deleted files but somehow still cant recover from seeing you.
                    </p>
                </div>
                <div ref={linkRef} className="flex gap-5 py-4 drop-shadow-[0_2px_4px_#6DAFC2]">
                    <a className="hover:scale-110 hover:text-[#A6E3F1] transition" href="mailto:mieayamperfect@gmail.com" target="_blank">
                        <HiOutlineMail className="text-3xl"></HiOutlineMail>
                    </a>
                    <a className="hover:scale-110 hover:text-[#A6E3F1] transition" href="https://discord.com/users/613005513168519178" target="_blank">
                        <FaDiscord className="text-3xl"></FaDiscord>
                    </a>
                    <a className="hover:scale-110 hover:text-[#A6E3F1] transition" href="https://linkedin.com/in/dhycko" target="_blank">
                        <FiLinkedin className="text-3xl"></FiLinkedin>
                    </a>
                    <a className="hover:scale-110 hover:text-[#A6E3F1] transition" href="https://github.com/Chikootlin" target="_blank">
                        <FiGithub className="text-3xl"></FiGithub>
                    </a>
                </div>
            </section>
        </>
    )
}