import { notion } from "./notion";
import { getPreviewText } from "./getPreviewText";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export async function getPosts() {
    const response = await notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID!, sorts: [
            {
                property: "Date",
                direction: "descending",
            },
        ],
        filter: {
            property: "Published",
            checkbox: {
                equals: true,
            },
        },
    });

    const posts = await Promise.all(response.results.filter((post): post is PageObjectResponse => "properties" in post).map(async (post) => {
            const preview = await getPreviewText(post.id);

            return {
                ...post,
                preview,
            };
        })
    );
    return posts;
}