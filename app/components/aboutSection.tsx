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
                // toggleActions: "play none none none",
                // markers: true,
                scrub: true
            }
        })
        
        tl.fromTo(titleRef.current,
            { y:40, opacity:0 },
            { y:0, opacity:1, duration:0.4, ease: 'power2.inOut' }
        )
        .fromTo(mainCard.current,
            { y:40, opacity:0 },
            { y:0, opacity:1, duration:0.6, ease: 'power2.inOut' },
            "-=0.3"
        )
        .fromTo(cardRef.current,
            { y:40, opacity:0 },
            { y:0, opacity:1, duration:0.6, ease: 'power2.inOut' },
            "-=0.3"
        )
    })

    return(
        <>
            <section ref={containerRef} className="relative min-h-screen bg-cover bg-center flex py-20 justify-center" style={{backgroundImage: "url('/images/about.webp')"}}>
                <div className="absolute inset-0 bg-[#3A3F5C]/86"></div>
                <div className="relative">
                    <h2 ref={titleRef} className="text-4xl text-center font-bold drop-shadow-[0_2px_4px_#6DAFC2] opacity-0">About Me</h2>
                    <div ref={mainCard} className="bg-[#454B6B] border border-[#7EA2C7] max-w-375 p-8 rounded-3xl mt-10">
                        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] p-2">
                            <div>
                                <p className="text-xl drop-shadow-[0_2px_4px_#6DAFC2] text-justify max-w-162.5">
                                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum lacinia nunc sed pharetra. Pellentesque maximus sed felis sit amet iaculis. Suspendisse turpis nunc, mollis id congue non, viverra quis tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse sed iaculis metus. Nullam aliquam ultrices urna nec imperdiet. Suspendisse rutrum libero quis odio posuere feugiat id quis velit. Morbi vel rutrum diam. Quisque porttitor euismod tellus et pulvinar. Proin eu nunc vel enim vehicula tincidunt. Sed elementum elit interdum imperdiet consectetur. Phasellus interdum vel orci a vestibulum. */}
                                    Im a developer with a strong interest in cybersecurity and digital forensics. I enjoy building web applications in my free times. My curiosity often leads me to analyze memory dumps, recover deleted data, and investigate digital artifacts.
                                </p>
                                <br />
                                <p className="text-xl drop-shadow-[0_2px_4px_#6DAFC2] text-justify max-w-162.5">
                                    I also participate in Capture The Flag competitions where I sharpen my problem-solving skills through challenges involving forensic analysis, reverse engineering, and system investigation. For me, technology isn’t just about building software, but understanding how systems break and how they can be made more secure.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <Image src={'/images/about_sticker.png'} alt="profile" width={250} height={300} unoptimized className="object-contain -ml-40"/>
                            </div>
                        </div>
                    </div>

                    <div ref={cardRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-6 gap-5">
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
                            text="I’m also a certified &quot;karbit&quot;. Current list of my kisah is: Wonyoung, Jihyo, Haerin, Suisei, Karina, Seol In-Ah, Go Youn-jung, Jiwoo, Kobo, Suisei, Ryujin, Winter, Momo, Aralie, Kimmy, Oline, Erine, and many more"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}