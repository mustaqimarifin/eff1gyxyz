const BLOG = require("./blog.config");

module.exports = {
  // @ts-ignore
  siteUrl: BLOG.link,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // ...other options
  // https://github.com/iamvishnusankar/next-sitemap#configuration-options
};
