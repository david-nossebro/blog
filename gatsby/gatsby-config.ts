export default {
  siteMetadata: {
    title: `Davids Gröna Band`,
    author: {
      name: `David Berg`,
      summary: `who lives in Sweden and loves outdoor adventures.`,
    },
    description: `Life is an adventure and this is mine.`,
    siteUrl: `https://epic-kilby-234579.netlify.com/`,
    social: {
      instagram: `david.nossebro`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${process.cwd()}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${process.cwd()}/content/route`,
        name: `route`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${process.cwd()}/content/foodplan`,
        name: `foodplan`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${process.cwd()}/content/gear`,
        name: `gear`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${process.cwd()}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-transformer-remark`,
            options: {
              plugins: [`gatsby-remark-emoji`],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`,
            options: {
              margin: 36,
              scrollOffset: 0,
              zIndex: 2000,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: true, // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-161597581-1`,
        respectDNT: true,
      },
    },
    // Providing RSS feed under /rss.xml
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        // eslint-disable-next-line @typescript-eslint/camelcase
        short_name: `GatsbyJS`,
        // eslint-disable-next-line @typescript-eslint/camelcase
        start_url: `/`,
        // eslint-disable-next-line @typescript-eslint/camelcase
        background_color: `#ffffff`,
        // eslint-disable-next-line @typescript-eslint/camelcase
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon-32x32.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {},
    },
    "gatsby-plugin-netlify",
  ],
}
