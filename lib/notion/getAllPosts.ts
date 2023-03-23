import BLOG from "blog.config.js";
import { type Post } from "types";
import { NotionAPI } from "notion-client";
import { idToUuid } from "notion-utils";
import { filterPublishedPosts, getAllPageIds, getPageProperties } from ".";
//import { BasePageBlock, Collection, ExtendedRecordMap } from 'notion-types';

export const getAllPosts = async ({
  includedPages = false,
}: {
  includedPages: boolean;
}): Promise<Post[]> => {
  let id = BLOG.notionPageId;
  const authToken = BLOG.notionAccessToken || null;
  const api = new NotionAPI({ authToken } || null);
  const response = await api.getPage(id);

  id = idToUuid(id);
  const collection = Object.values(response.collection)[0]?.value;
  const collectionQuery = response.collection_query;
  const block = response.block;
  const schema = collection?.schema;

  const rawMetadata = block[id]?.value;

  // Check Type
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.log(`pageId "${id}" is not a database`);
    return null;
  } else {
    // Construct Data
    const pageIds = getAllPageIds(collectionQuery);
    const data = [];
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i];
      const properties = (await getPageProperties(id, block, schema)) || null;

      // Add fullwidth, createdtime to properties
      properties.createdTime = new Date(
        block[id].value?.created_time
      ).toString();
      properties.fullWidth = block[id].value?.format?.page_full_width ?? false;

      data.push(properties);
    }

    // remove all the the items doesn't meet requirements
    const posts = filterPublishedPosts({ posts: data, includedPages });

    // Sort by date
    if (BLOG.sortByDate) {
      posts.sort((a, b) => {
        const dateA = new Date(a?.date?.start_date || a.createdTime);
        const dateB = new Date(b?.date?.start_date || b.createdTime);
        return dateB.getTime() - dateA.getTime();
      });
    }
    return posts;
  }
};
