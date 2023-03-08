import { ExtendedRecordMap } from "notion-types";
import { idToUuid } from "notion-utils";

export const getAllPageIds = (
  collectionQuery: ExtendedRecordMap["collection_query"],
  viewId?: string
): string[] => {
  const views = Object.values(collectionQuery)?.[0];
  let pageIds = [];
  if (viewId) {
    const vId = idToUuid(viewId);
    pageIds = views[vId]?.blockIds;
  } else if (views) {
    const pageSet = new Set<string>();
    Object.values(views).forEach((view) => {
      view?.blockIds?.forEach((id) => pageSet.add(id));
    });
    pageIds = Array.from(pageSet);
  } else {
    return [];
  }
  return pageIds;
};
