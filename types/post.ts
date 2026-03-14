export type Post = {
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