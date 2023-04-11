//import ms from 'ms'
import axios from 'axios'

export const getSlug = (url: URL): string => {
  const { pathname } = new URL(url)
  const path = pathname.substring(7)
  return path
}

export const getURL = (url: string) => {
  const { origin, pathname } = new URL(url)

  return `${origin}${pathname}`
}
/* export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never'
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? '' : ' ago'
  }`
}
 */
//^-- Fetcher | Axios *undecided*
export const yespls = (url: string) => axios.get(url).then((res) => res?.data)

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return '0'
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, '$1') + item.symbol
    : '0'
}

export function capitalize(str: string) {
  if (!str || typeof str !== 'string') return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str
  return `${str.slice(0, length)}...`
}

//^---TwitterAPI

export const getTweets = async (ids: any[]) => {
  if (ids.length === 0) {
    return []
  }

  const queryParams = new URLSearchParams({
    ids: ids.join(','),
    expansions:
      'author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id',
    'tweet.fields':
      'attachments,author_id,public_metrics,created_at,id,in_reply_to_user_id,referenced_tweets,text',
    'user.fields': 'id,name,profile_image_url,protected,url,username,verified',
    'media.fields':
      'duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics',
  })

  const response = await fetch(
    `https://api.twitter.com/2/tweets?${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
      },
    }
  )

  const tweets = await response.json()

  const getAuthorInfo = (author_id: any) => {
    return tweets.includes.users.find(
      (user: { id: any }) => user.id === author_id
    )
  }

  const getReferencedTweets = (mainTweet: { referenced_tweets: any[] }) => {
    return (
      mainTweet?.referenced_tweets?.map((referencedTweet) => {
        const fullReferencedTweet = tweets.includes.tweets.find(
          (tweet: { id: any }) => tweet.id === referencedTweet.id
        )

        return {
          type: referencedTweet.type,
          author: getAuthorInfo(fullReferencedTweet.author_id),
          ...fullReferencedTweet,
        }
      }) || []
    )
  }

  return (
    tweets.data.reduce(
      (
        allTweets: any,
        tweet: { attachments?: any; author_id?: any; referenced_tweets?: any[] }
      ) => {
        const tweetWithAuthor = {
          ...tweet,
          media:
            tweet?.attachments?.media_keys.map((key: any) =>
              tweets.includes.media.find(
                (media: { media_key: any }) => media.media_key === key
              )
            ) || [],
          //@ts-ignore
          referenced_tweets: getReferencedTweets(tweet),
          author: getAuthorInfo(tweet.author_id),
        }

        return [tweetWithAuthor, ...allTweets]
      },
      []
    ) || [] // If the Twitter API key isn't set, don't break the build
  )
}

export const getTweetCount = async () => {
  const response = await fetch(
    `https://api.twitter.com/2/users/by/username/leeerob?user.fields=public_metrics`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
      },
    }
  )

  const { data } = await response.json()
  return Number(data.public_metrics.tweet_count)
}
