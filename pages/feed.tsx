import { getAllPosts } from "lib/notion";
import { generateRss } from "lib/rss";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  res.setHeader("Content-Type", "text/xml");
  const posts = await getAllPosts({ includedPages: false });
  const latestPosts = posts.slice(0, 10);
  const xmlFeed = await generateRss(latestPosts);
  res.write(xmlFeed);
  res.end();
  return {
    props: {},
  };
}
const feed = (): any => null;
export default feed;
