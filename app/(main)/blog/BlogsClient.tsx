"use client";

import PostCard from "../../components/postCard";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

type Post = {
    id: string
    properties: {
        Name?: {
            title: { plain_text: string }[]
        }
        Slug?: {
            rich_text: { plain_text: string }[]
        }
        Category?: {
            select?: {
                name: string
            }
        }
    }
}

export default function BlogsClient({ posts }: { posts: Post[] }) {
    const containerRef = useRef(null)
    const titleRef = useRef(null)
    const cardRef = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
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
    })

    const [activeCategory, setActiveCategory] = useState("all");
    const categories = [
        { name: "All Categories", value: "all" },
        { name: "Writeups", value: "writeups" },
        { name: "Reviews", value: "reviews" },
        { name: "Notes", value: "notes" },
        { name: "Misc", value: "misc" }
    ];

    const filteredPosts = activeCategory === "all" ? posts : posts.filter((post) => {
        const cat = post.properties.Category?.select?.name?.toLowerCase()
        return cat === activeCategory
    })

    return (
        <>
            <section ref={containerRef} className="relative min-h-dvh md:min-h-screen bg-cover bg-center pt-28 md:pt-40 pb-16 px-4" style={{ backgroundImage: "url('/images/asfalt-light.webp')" }}>
                <div className="absolute inset-0 bg-[#3A3F5C]/86"></div>
                <div className="relative max-w-7xl mx-auto">
                    {/* title */}
                    <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl text-center font-bold drop-shadow-[0_2px_4px_#6DAFC2]">
                        Blogs
                    </h2>
                    {/* main grid */}
                    <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 md:gap-10 py-8">
                        {/* post */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post) => (<PostCard key={post.id} post={post} />))}
                        </div>
                        {/* category */}
                        <div className="hidden lg:block bg-[#454B6B] border border-[#7EA2C7] p-4 md:p-6 rounded-3xl h-fit text-sm md:text-base">
                            <h1 className="text-lg md:text-2xl drop-shadow-[0_2px_4px_#6DAFC2]">
                                Categories
                            </h1>
                            <ul className="space-y-2 pt-4">
                                {categories.map((cat, i) => {
                                    const isLast = i === categories.length - 1
                                    return (
                                        <li key={cat.value}>
                                            <button onClick={() => setActiveCategory(cat.value)} className={`flex items-center gap-2 w-full text-left transition cursor-pointer ${ activeCategory === cat.value ? "text-[#A6E3F1] font-bold drop-shadow-[0_2px_4px_#6DAFC2]" : "hover:text-[#A6E3F1] drop-shadow-[0_2px_4px_#6DAFC2]" }`}>
                                                <span className="text-gray-400">
                                                    {isLast ? "└─" : "├─"}
                                                </span>
                                                {cat.name}
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}