import BLOG from "blog.config.mjs";
import { NotionAPI } from "notion-client";
import { getPreviewImageMap } from "./previewImages";

export const getPostBlocks = async (id) => {
  const authToken = BLOG.notionAccessToken;
  const api = new NotionAPI({ authToken } || null);
  const recordMap = await api.getPage(id);
  if (BLOG.previewImagesEnabled) {
    const previewImageMap = await getPreviewImageMap(recordMap);
    (recordMap as any).preview_images = previewImageMap;
  }
  return recordMap;
};
