import Image from "next/image"
import Link from "next/link"
import { getPageContent, getChildrenMap } from "@/lib/getPageContent"
import { getPostById } from "@/lib/getPostById"
import { PageObjectResponse, BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"

type NumberedListBlock = Extract< BlockObjectResponse, { type: "numbered_list_item" }>
type BulletListBlock = Extract< BlockObjectResponse, { type: "bulleted_list_item" } >

export default async function BlogDetail({ params }: { params: Promise< { slug: string } > }) {
    const { slug } = await params
    const pageId = slug
    const post = await getPostById(pageId)
    const page = post as PageObjectResponse
    const blocks = await getPageContent(page.id)

    const childrenMap = await getChildrenMap(
        blocks as BlockObjectResponse[]
    )

    let title = "No title"
    const nameProp = page.properties.Name
    if (nameProp?.type === "title") {
        title = nameProp.title[0]?.plain_text || "No title"
    }

    let cover = ""
    const coverProp = page.properties.Cover
    if (coverProp?.type === "files") {
        const file = coverProp.files?.[0]

        if (file?.type === "file") {
            cover = file.file.url
        }

        if (file?.type === "external") {
            cover = file.external.url
        }
    }

    const headings = (blocks as BlockObjectResponse[]).filter((b) => b.type === "heading_1" || b.type === "heading_2" || b.type === "heading_3" )

    function renderRichText(richText: RichTextItemResponse[]) {
        return richText.map((t, i) => {
            if (t.annotations?.code) {
                return (
                    <code key={i} className="bg-[#1e1e1e] text-[#A6E3F1] px-1 py-0.5 rounded font-mono">
                        {t.plain_text}
                    </code>
                )
            }
            return <span key={i}>{t.plain_text}</span>
        })
    }

    return(
        <>
            <section className="relative min-h-dvh md:min-h-screen bg-cover bg-center pt-28 md:pt-40 pb-16 px-4" style={{ backgroundImage: "url('/images/asfalt-light.webp')" }}>
                <div className="absolute inset-0 bg-[#3A3F5C]/86"></div>
                <div className="relative w-full max-w-7xl mx-auto px-6">
                    <Link href={'/blog'} className="text-sm md:text-base drop-shadow-[0_2px_4px_#6DAFC2] hover:text-[#A6E3F1]">
                        &lt;- Back To All Posts
                    </Link>
                    <h1 className="text-2xl md:text-4xl font-extrabold py-6 drop-shadow-[0_2px_4px_#6DAFC2]">
                        {title}
                    </h1>
                    {/* cover */}
                    {cover && (
                        <div className="relative w-full aspect-video md:aspect-4/1">
                            <Image
                                src={cover}
                                alt="cover"
                                fill
                                unoptimized
                                className="object-cover rounded-2xl"
                            />
                        </div>
                    )}
                </div>

                <div className="relative w-full max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_280px] gap-10">
                        {/* content */}
                        <div className="space-y-4">
                            {(blocks as BlockObjectResponse[]).map((block, i, arr) => {
                                if (block.type === "image") {
                                    const file = block.image
                                    let url = ""
                                    if (file.type === "external") {
                                        url = file.external.url
                                    }
                                    if (file.type === "file") {
                                        url = file.file.url
                                    }
                                    if (!url) return null

                                    return (
                                        <div key={block.id} className="relative w-full aspect-video my-4">
                                            <Image
                                                src={url}
                                                alt=""
                                                fill
                                                unoptimized
                                                className="object-contain rounded-xl"
                                            />
                                        </div>
                                    )
                                }

                                if (block.type === "code") {
                                    return (
                                        <pre key={block.id} className="bg-[#1e1e1e] text-green-300 p-4 rounded-xl overflow-x-auto my-4">
                                            <code>
                                                {block.code.rich_text[0]?.plain_text}
                                            </code>
                                        </pre>
                                    )
                                }

                                if (block.type === "bulleted_list_item") {
                                    const prev = arr[i - 1]

                                    if (prev?.type === "bulleted_list_item") {
                                        return null
                                    }

                                    const items = []
                                    let j = i

                                    while (arr[j]?.type === "bulleted_list_item") {
                                        const b = arr[j] as BulletListBlock
                                        items.push(
                                            <li key={b.id}>
                                                {renderRichText( b.bulleted_list_item.rich_text )}
                                            </li>
                                        )
                                        j++
                                    }

                                    return (
                                        <ul key={block.id} className="ml-6 list-disc space-y-1">
                                            {items}
                                        </ul>
                                    )
                                }

                                if (block.type === "numbered_list_item") {
                                    const prev = arr[i - 1]

                                    if (prev?.type === "numbered_list_item") { return null }
                                    const items = []
                                    let j = i

                                    while (arr[j]?.type === "numbered_list_item") {
                                        const b = arr[j] as NumberedListBlock
                                        const children = childrenMap[b.id] || []
                                        items.push(
                                            <li key={b.id}>
                                                {renderRichText( b.numbered_list_item.rich_text )}
                                                {children.map((c) => {
                                                    if (c.type === "paragraph") {
                                                        return (
                                                            <p key={c.id} className="ml-4 text-sm">
                                                                {renderRichText(c.paragraph.rich_text)}
                                                            </p>
                                                        )
                                                    }

                                                    if (c.type === "code") {
                                                        return (
                                                            <pre key={c.id} className="ml-4 bg-[#1e1e1e] p-2 rounded">
                                                                {c.code.rich_text[0]?.plain_text}
                                                            </pre>
                                                        )
                                                    }
                                                    return null
                                                })}
                                            </li>
                                        )
                                        j++
                                    }
                                    return (
                                        <ol key={block.id} className="ml-6 list-decimal space-y-2">
                                            {items}
                                        </ol>
                                    )
                                }

                                if (block.type === "quote") {
                                    return (
                                        <blockquote key={block.id} className="border-l-4 border-cyan-400 pl-4 italic my-4 drop-shadow-[0_2px_4px_#6DAFC2]">
                                            {block.quote.rich_text[0]?.plain_text}
                                        </blockquote>
                                    )
                                }

                                if (block.type === "paragraph") {
                                    return (
                                        <p key={block.id} className="drop-shadow-[0_2px_4px_#6DAFC2]">
                                            {renderRichText(block.paragraph.rich_text)}
                                        </p>
                                    )
                                }

                                if (block.type === "heading_1") {
                                    return (
                                        <h1 key={block.id} id={block.id} className="text-3xl font-extrabold drop-shadow-[0_2px_4px_#6DAFC2]">
                                            {block.heading_1.rich_text[0]?.plain_text}
                                        </h1>
                                    )
                                }

                                if (block.type === "heading_2") {
                                    return (
                                        <h2 key={block.id} id={block.id} className="text-2xl font-extrabold drop-shadow-[0_2px_4px_#6DAFC2]">
                                            {block.heading_2.rich_text[0]?.plain_text}
                                        </h2>
                                    )
                                }

                                if (block.type === "heading_3") {
                                    return (
                                        <h3 key={block.id} id={block.id} className="text-xl font-extrabold drop-shadow-[0_2px_4px_#6DAFC2]">
                                            {block.heading_3.rich_text[0]?.plain_text}
                                        </h3>
                                    )
                                }
                                return null
                            })}
                        </div>

                        {/* table of content */}
                        <div className="hidden lg:block">
                            <div className="sticky top-40 bg-[#454B6B] border border-[#7EA2C7] rounded-2xl p-4">
                                <h3 className="text-center font-extrabold mb-2 drop-shadow-[0_2px_4px_#6DAFC2]">
                                    Table of Contents
                                </h3>
                                <ul className="space-y-2 text-sm drop-shadow-[0_2px_4px_#6DAFC2]">
                                    {headings.map((h) => {
                                        let text = ""
                                        let level = 0

                                        if (h.type === "heading_1") {
                                            text = h.heading_1.rich_text[0]?.plain_text || ""
                                            level = 1
                                        }
                                        if (h.type === "heading_2") {
                                            text = h.heading_2.rich_text[0]?.plain_text || ""
                                            level = 2
                                        }
                                        if (h.type === "heading_3") {
                                            text = h.heading_3.rich_text[0]?.plain_text || ""
                                            level = 3
                                        }

                                        const indent = level === 1 ? "ml-0" : level === 2 ? "ml-4" : "ml-8"
                                        const fontStyle = level === 1 ? "font-bold" : level === 2 ? "font-medium" : "font-normal"

                                        return (
                                            <li key={h.id} className={indent}>
                                                <a href={`#${h.id}`} className={`hover:text-[#A6E3F1] block ${fontStyle}`}>
                                                    {level > 1 && "└ "}
                                                    {text}
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}