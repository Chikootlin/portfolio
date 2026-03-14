"use client"

import PostCard from "./postCard"
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { Post } from "@/types/post";
gsap.registerPlugin(ScrollTrigger)

export default function PostSection({ posts }: { posts: Post[] }) {
    const containerRef = useRef(null)
    const titleRef = useRef(null)
    const cardRef = useRef(null)
    const linkRef = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "20%",
                scrub: true
            }
        })

        tl.fromTo(
            titleRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1 }
        )
        .fromTo(
            cardRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1 },
            "-=0.3"
        )
        .fromTo(
            linkRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1 },
            "-=0.3"
        )
    })

    return (
        <>
            <section ref={containerRef} className="relative bg-[#3A3F5C] py-12 md:py-16 px-4 md:px-10 z-20">
                {/* title */}
                <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl text-center font-bold drop-shadow-[0_2px_4px_#6DAFC2] opacity-0">
                    Latest Posts
                </h2>
                {/* grid */}
                <div ref={cardRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8 max-w-7xl mx-auto opacity-0">
                    {posts?.slice(0, 4).map((post) => ( <PostCard key={post.id} post={post} /> ))}
                </div>

                {/* link */}
                <div className="flex justify-center md:justify-end">
                    <Link href="/blog" ref={linkRef} className="text-sm md:text-xl hover:text-[#A6E3F1] transition drop-shadow-[0_2px_4px_#6DAFC2]">
                        ← View All Posts
                    </Link>
                </div>
            </section>
        </>
    )
}