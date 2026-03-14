"use client"

import Image from "next/image";
import { FiGithub, FiLinkedin} from "react-icons/fi"
import { FaDiscord } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger)

export default function HeroSection(){
    const containerRef = useRef(null)
    const imageRef = useRef(null)
    const textRef = useRef<HTMLHeadingElement | null>(null)
    const decRef = useRef<HTMLParagraphElement | null>(null)
    const linkRef = useRef(null)
    
    const typeText = (element: HTMLElement, speed = 0.05) => {
        const text = element.innerText
        const letters = text.split("")
        element.innerHTML = letters.map(x => `<span class="char">${x}</span>`).join("")
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

        if (el1) typeText(el1, 0.08)
        if (el2) typeText(el2, 0.01)

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

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
            }
        })

        tl.fromTo(
            [
                textRef.current,
                imageRef.current,
                decRef.current,
                linkRef.current,
            ],
            {
                y: 0,
                opacity: 1,
            },
            {
                y: -300,
                opacity: 0,
            }
        )

        ScrollTrigger.refresh()

    }, { scope: containerRef })

    return(
        <>
            <section ref={containerRef} className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-24 md:py-40 text-center" style={{backgroundImage: "url('/images/hero.webp')"}}>
                <div className="absolute inset-0 bg-[#3A3F5C]/86"></div>
                {/* image */}
                <div ref={imageRef} className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60">
                    <Image
                        src={`https://avatars.githubusercontent.com/u/183741237?v=4`}
                        alt="profile"
                        fill
                        unoptimized
                        className="rounded-full object-cover"
                    />
                </div>

                {/* name */}
                <div className="py-3 md:py-4">
                    <h1 ref={textRef} className="text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow-[0_2px_4px_#6DAFC2]">
                        MieAyamPerfect
                    </h1>
                </div>

                {/* description */}
                <div className="max-w-xs sm:max-w-md md:max-w-2xl px-2 drop-shadow-[0_2px_4px_#6DAFC2]">
                    <p ref={decRef} className="text-sm sm:text-base md:text-lg">
                        Digital forensics player. I recover deleted files but somehow still cant recover from seeing you.
                    </p>
                </div>

                {/* links */}
                <div ref={linkRef} className="flex gap-4 md:gap-5 py-4 drop-shadow-[0_2px_4px_#6DAFC2]">
                    <a className="hover:scale-110 transition text-xl md:text-3xl" href="mailto:mieayamperfect@gmail.com" target="_blank">
                        <HiOutlineMail/>
                    </a>

                    <a className="hover:scale-110 transition text-xl md:text-3xl" href="https://discord.com/users/613005513168519178" target="_blank">
                        <FaDiscord/>
                    </a>

                    <a className="hover:scale-110 transition text-xl md:text-3xl" href="https://linkedin.com/in/dhycko" target="_blank">
                        <FiLinkedin/>
                    </a>

                    <a className="hover:scale-110 transition text-xl md:text-3xl" href="https://github.com/Chikootlin" target="_blank">
                        <FiGithub/>
                    </a>
                </div>
            </section>
        </>
    )
}