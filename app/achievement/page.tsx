"use client"

import AchievementCard from "../components/achievementCard";
import achievements from "@/data/achievement.json"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger)

type Achievement = {
  id: string
  title: string
  rank: string
  year: number
  category: string
  team: string
  organizer: string
}

export default function Achievements() {

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

  return (
    <section
      ref={containerRef}
      className="
      relative
      min-h-screen
      bg-cover
      bg-center
      pt-28 md:pt-40
      pb-16
      px-4
      flex
      justify-center
      "
      style={{ backgroundImage: "url('/images/asfalt-light.webp')" }}
    >

      <div className="absolute inset-0 bg-[#3A3F5C]/86"></div>

      <div className="relative w-full max-w-5xl mx-auto">

        {/* TITLE */}

        <h2
          ref={titleRef}
          className="
          text-2xl
          sm:text-3xl
          md:text-4xl
          text-center
          font-bold
          drop-shadow-[0_2px_4px_#6DAFC2]
          mb-8 md:mb-10
          "
        >
          Achievements
        </h2>


        {/* LIST */}

        <div
          ref={cardRef}
          className="
          flex
          flex-col
          gap-4
          md:gap-6
          "
        >

          {(achievements as Achievement[]).map((x) => (

            <AchievementCard
              key={x.id}
              title={x.title}
              rank={x.rank}
              year={x.year}
              category={x.category}
              team={x.team}
              organizer={x.organizer}
            />

          ))}

        </div>

      </div>

    </section>
  );
}