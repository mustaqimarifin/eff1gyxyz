import KeyvRedis from '@keyv/redis'
import BLOG from 'blog.config'
import Keyv from 'keyv'

let db: Keyv
if (BLOG.previewImagesEnabled) {
  const keyvRedis = new KeyvRedis(BLOG.redisUrl)
  db = new Keyv({ store: keyvRedis, namespace: 'tinyimg' || undefined })
} else {
  db = new Keyv()
}

export { db }
