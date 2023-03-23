import Keyv from "keyv";
import KeyvRedis from "@keyv/redis";
import BLOG from "blog.config.mjs";

let db: Keyv;
if (BLOG.previewImagesEnabled) {
  const keyvRedis = new KeyvRedis(BLOG.redisUrl);
  db = new Keyv({ store: keyvRedis, namespace: "tinyimg" || undefined });
} else {
  db = new Keyv();
}

export { db };
