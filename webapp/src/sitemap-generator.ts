// sitemap-generator.js
const { Sitemap } = require("react-router-sitemap");

const router = require("./src/App").default;

new Sitemap(router)
  .build("https://example.com")
  .save("./public/sitemap.xml");
