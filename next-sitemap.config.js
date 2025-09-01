/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:'https://www.misho.cfd',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  autoLastmod: true,
  exclude: ['/admin/*', '/private/*']
};
