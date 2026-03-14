import { getPosts } from "@/lib/getPosts";
import BlogsClient from "./BlogsClient";

export default async function BlogPage() {
  const posts = await getPosts();

  return <BlogsClient posts={posts} />;
}