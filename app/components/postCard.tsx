import Image from "next/image"
import { FaCalendar } from "react-icons/fa"
import Link from "next/link"

type Post = {
  id: string
  preview?: string
  properties: {
    Name?: {
      title: { plain_text: string }[]
    }
    Date?: {
      date?: {
        start: string
      }
    }
    Cover?: {
      files?: {
        file?: { url: string }
        external?: { url: string }
      }[]
    }
  }
}

export default function PostCard({ post }: { post: Post }) {

    const id = post.id

    const title =
        post.properties.Name?.title?.[0]?.plain_text || "No title"

    const rawDate =
        post.properties.Date?.date?.start

    let date = ""

    if (rawDate) {
        const d = new Date(rawDate)

        const month = d.toLocaleString("en-US", {
            month: "long",
        })

        const day = d.getDate()
        const year = d.getFullYear()

        date = `${month}, ${day} ${year}`
    }

    const cover =
        post.properties.Cover?.files?.[0]?.file?.url ||
        post.properties.Cover?.files?.[0]?.external?.url ||
        "/images/earth.jpg"

    const desc = post.preview || ""

    return (

        <Link href={`/blog/${id}`}>

            <div
                className="
                bg-[#454B6B]
                rounded-2xl
                overflow-hidden
                border border-[#7EA2C7]
                hover:scale-105
                transition
                w-full
                max-w-sm
                mx-auto
                "
            >

                {/* IMAGE */}

                <div
                    className="
                    relative
                    h-36
                    sm:h-40
                    md:h-44
                    "
                >
                    <Image
                        src={cover}
                        alt="post"
                        fill
                        className="object-cover object-top"
                    />
                </div>


                {/* CONTENT */}

                <div
                    className="
                    p-4
                    md:p-6
                    "
                >

                    <h3
                        className="
                        text-lg
                        md:text-2xl
                        font-bold
                        mb-2
                        drop-shadow-[0_2px_4px_#6DAFC2]
                        line-clamp-1
                        "
                    >
                        {title}
                    </h3>


                    <p
                        className="
                        text-gray-300
                        text-xs
                        md:text-sm
                        leading-relaxed
                        line-clamp-5
                        "
                    >
                        {desc}
                    </p>


                    <div
                        className="
                        flex
                        items-center
                        gap-2
                        text-gray-400
                        text-xs
                        md:text-sm
                        mt-6
                        "
                    >
                        <FaCalendar />
                        <span>{date}</span>
                    </div>

                </div>

            </div>

        </Link>
    )
}