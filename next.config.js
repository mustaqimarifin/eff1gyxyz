const defineNextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  images: {
    domains: [
      "i.scdn.co", // Spotify Album Art
      "pbs.twimg.com", // Twi,
      "cdn.sanity.io",
      "lh3.googleusercontent.com",
      "i.ytimg.com",
      "avatars.githubusercontent.com",
      "gravatar.com",
      "s3.us-west-2.amazonaws.com",
      "www.notion.so",
    ],
  },
  eslint: {
    dirs: ["components", "layouts", "lib", "pages"],
  },
};

module.exports = defineNextConfig;
