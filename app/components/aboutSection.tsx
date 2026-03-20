"use client"

import Image from "next/image"
import AboutCard from "./aboutCard"
import { FiFlag, FiHeart, FiBookOpen } from "react-icons/fi"
import { FaGamepad } from "react-icons/fa"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger)

export default function AboutSection(){
    const containerRef = useRef(null)
    const titleRef = useRef(null)
    const mainCard = useRef(null)
    const cardRef = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: containerRef.current,
                start: "top 80%",
                end: "20%",
                scrub: true
            }
        })

        tl.fromTo(titleRef.current,
            { y:40, opacity:0 },
            { y:0, opacity:1 }
        )
        .fromTo(mainCard.current,
            { y:40, opacity:0 },
            { y:0, opacity:1 },
            "-=0.3"
        )
        .fromTo(cardRef.current,
            { y:40, opacity:0 },
            { y:0, opacity:1 },
            "-=0.3"
        )

    })

    return(
        <>
            <section ref={containerRef} className="relative bg-cover bg-center py-16 md:py-20 px-4" style={{backgroundImage: "url('/images/about.webp')"}}>
                <div className="absolute inset-0 bg-[#3A3F5C]/86"></div>
                <div className="relative max-w-7xl mx-auto">
                    {/* title */}
                    <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl text-center font-bold drop-shadow-[0_2px_4px_#6DAFC2] opacity-0">
                        About Me
                    </h2>
                    {/* main card */}
                    <div ref={mainCard} className="bg-[#454B6B] border border-[#7EA2C7] p-4 sm:p-6 md:p-8 rounded-3xl mt-8 opacity-0">
                        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 items-center">
                            {/* text */}
                            <div className="space-y-4 text-sm sm:text-base md:text-lg text-justify drop-shadow-[0_2px_4px_#6DAFC2]">
                                <p>
                                    Im a developer with a strong interest in cybersecurity and digital forensics.
                                    I enjoy building web applications in my free times. My curiosity often leads
                                    me to analyze memory dumps, recover deleted data, and investigate digital artifacts.
                                </p>

                                <p>
                                    I also participate in Capture The Flag competitions where I sharpen my
                                    problem-solving skills through challenges involving forensic analysis,
                                    reverse engineering, and system investigation.
                                </p>
                            </div>
                            {/* image */}
                            <div className="flex justify-center">
                                <Image
                                    src={"/images/about_sticker.png"}
                                    alt="profile"
                                    width={250}
                                    height={300}
                                    unoptimized
                                    className="object-contain w-40 sm:w-52 md:w-64"
                                >
                                </Image>
                            </div>
                        </div>
                    </div>
                    {/* cards */}
                    <div ref={cardRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6 opacity-0">
                        <AboutCard
                            icon={FiFlag}
                            text="CTF competitions are where I sharpen my cybersecurity skills. I enjoy solving challenges related to digital forensics, reverse engineering, and system analysis."
                        />
                        <AboutCard
                            icon={FaGamepad}
                            text="I enjoy story-driven games, especially RPGs and visual novels. Good characters and world building always pull me in. If you like Persona, we’re already friends."
                        />
                        <AboutCard
                            icon={FiBookOpen}
                            text="Recently I’ve been enjoying reading novels, especially romance. There’s something about the emotions and character moments that makes me pause and think “when yah?”"
                        />
                        <AboutCard
                            icon={FiHeart}
                            text="I’m also a certified &quot;karbit&quot;. Current list of my kisah is: Wonyoung, Jihyo, Haerin, Suisei, Karina, Seol In-Ah, Go Youn-jung, Kobo, Suisei, Aralie, Kimmy, Oline, Erine, and many more"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}