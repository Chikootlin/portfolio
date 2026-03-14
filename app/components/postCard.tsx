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
    Slug?: {
      rich_text: { plain_text: string }[]
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

export default function PostCard({post}: {post: Post}){
    const id = post.id
    const title = post.properties.Name?.title?.[0]?.plain_text || "No title"
    const rawDate = post.properties.Date?.date?.start

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

    const cover = post.properties.Cover?.files?.[0]?.file?.url || post.properties.Cover?.files?.[0]?.external?.url || "/images/earth.jpg"
    const desc = post.preview || ""
    
    return(
        <>
          <Link href={`/blog/${id}`}>
            {/* Card */}
            <div className="bg-[#454B6B] rounded-2xl overflow-hidden border border-[#7EA2C7] max-w-85 hover:scale-105 transition">
              {/* Image */}
              <div className="relative h-40">
                <Image
                  src={cover}
                  alt="post"
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 drop-shadow-[0_2px_4px_#6DAFC2] line-clamp-1">
                  {title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed line-clamp-7">
                  {desc}
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at nunc pellentesque, dictum est at, semper urna. Aliquam ac fermentum libero, nec dictum enim. Donec at feugiat dui, ut feugiat neque. Nulla facilisi.  */}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-gray-400 text-sm mt-10">
                  <FaCalendar></FaCalendar>
                  <span>{date}</span>
                </div>
              </div>
            </div>
          </Link>
        </>
    )
}