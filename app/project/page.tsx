"use client"

import ProjectCard from "../components/projectCard"
import projects from "@/data/project.json"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger)

type Project = {
  id: string
  title: string
  description: string
  date: string
  image: string
}

export default function Projects() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const cardRef = useRef(null)
  
  useGSAP(() => {
      const tl = gsap.timeline({
          scrollTrigger:{
              trigger: containerRef.current,
              start: "top 80%",
              // end: "20%",
              toggleActions: "play none none none",
              // markers: true,
              // scrub: true
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
  })

  return (
    <>
      <section ref={containerRef} className="relative min-h-screen bg-cover bg-center flex pt-40 justify-center" style={{ backgroundImage: "url('/images/asfalt-light.webp')" }}>
        <div className="absolute inset-0 bg-[#3A3F5C]/86"></div>
        <div className="relative w-full max-w-7xl px-6">
          <h2 ref={titleRef} className="text-4xl text-center font-bold drop-shadow-[0_2px_4px_#6DAFC2] mb-10">
            Projects
          </h2>
          <div ref={cardRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(projects as Project[]).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}