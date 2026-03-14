import HeroSection from "./components/heroSection";
import PostSection from "./components/postSection";
import AboutSection from "./components/aboutSection";
import { getPosts } from "@/lib/getPosts";

export default async function Home() {
  const posts = await getPosts()

  return (
    <>
      {/* Hero */}
      <HeroSection></HeroSection>

      {/* Posts */}
      <PostSection posts={posts}></PostSection>

      {/* About */}
      <AboutSection></AboutSection>
      
    </>
  );
}
