import { notion } from "./notion";

export async function getPostById(id: string) {
    return await notion.pages.retrieve({
        page_id: id,
    });
}