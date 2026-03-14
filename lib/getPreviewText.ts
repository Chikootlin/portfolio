import { getPageContent } from "./getPageContent";

export async function getPreviewText(pageId: string) {
    const blocks = await getPageContent(pageId);
    for (const block of blocks) {
        if (!("type" in block)) continue;

        if (block.type === "paragraph" && "paragraph" in block) {
            const text = block.paragraph.rich_text[0]?.plain_text;
            if (text) return text;
        }
    }
    return "";
}