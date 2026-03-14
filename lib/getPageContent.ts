import { notion } from "./notion"
import { BlockObjectResponse, PartialBlockObjectResponse, } from "@notionhq/client/build/src/api-endpoints"

export async function getPageContent(pageId: string) {
    let results: (BlockObjectResponse | PartialBlockObjectResponse)[] = []
    let cursor: string | undefined = undefined

    while (true) {
        const res = await notion.blocks.children.list({
            block_id: pageId,
            start_cursor: cursor,
        })

        results = results.concat(res.results)
        if (!res.has_more) break

        cursor = res.next_cursor ?? undefined
    }
    return results
}

export async function getChildrenMap(blocks: BlockObjectResponse[]) {
    const map: Record<string, BlockObjectResponse[]> = {}

    for (const block of blocks) {
        if ("has_children" in block && block.has_children) {
            const res = await notion.blocks.children.list({
                block_id: block.id,
            })

            map[block.id] = res.results as BlockObjectResponse[]
        }
    }

    return map
}