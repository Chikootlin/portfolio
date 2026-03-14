"use client"

import PostCard from "./postCard"
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { Post } from "@/types/post";
gsap.registerPlugin(ScrollTrigger)

export default function PostSection({ posts }: {posts: Post[]}){
    const containerRef = useRef(null)
    const titleRef = useRef(null)
    const cardRef = useRef(null)
    const linkRef = useRef(null)
    
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
        .fromTo(cardRef.current,
            { y:40, opacity:0 },
            { y:0, opacity:1, duration:0.6, ease: 'power2.inOut' },
            "-=0.3"
        )
        .fromTo(linkRef.current,
            { y:40, opacity:0 },
            { y:0, opacity:1, duration:0.2, ease: 'power2.inOut' },
            "-=0.3"
        )
    })
    return(
        <>
            <section ref={containerRef} className="relative bg-[#3A3F5C] py-16 px-10 z-20">
                <div>
                <h2 ref={titleRef} className="text-4xl text-center font-bold drop-shadow-[0_2px_4px_#6DAFC2] opacity-0">Latest Posts</h2>
                <div ref={cardRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 mx-auto justify-items-center opacity-0">
                    {posts?.slice(0,4).map((post) => (
                        <PostCard key={post.id} post={post}></PostCard>
                    ))}
                </div>
                <Link href={"/blog"} ref={linkRef} className="flex justify-end pr-16 hover:text-[#A6E3F1] transition text-xl drop-shadow-[0_2px_4px_#6DAFC2]">
                    &lt;- View All Posts
                </Link>

                </div>
            </section>
        </>
    )
}