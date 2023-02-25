import { Block } from "notion-types";
import { defaultMapImageUrl } from "react-notion-x";
//import { defaultPageCover, defaultPageIcon } from './config'

export const mapImageUrl = (url: string, block: Block) => {
  return defaultMapImageUrl(url, block);
};
