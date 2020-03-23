const path = require(`path`)
const { siteMetadata } = require(`../gatsby-config`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  createBlogPosts(graphql, createPage)

  if (siteMetadata.markdownPageSections) {
    siteMetadata.markdownPageSections.forEach(section => {
      createMarkdownPages(section, graphql, createPage)
    })
  }
}

const createBlogPosts = async (graphql, createPage) => {
  const blogResult = await getAllMarkdownPagesFromCollection("blog", graphql)
  const blogPosts = blogResult.data.allMarkdownRemark.edges

  blogPosts.forEach((post, index) => {
    const previous =
      index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
    const next = index === 0 ? null : blogPosts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: path.resolve(`./src/templates/blog-template.js`),
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

const createMarkdownPages = async (section, graphql, createPage) => {
  const result = await getAllMarkdownPagesFromCollection(section.name, graphql)
  const pages = result.data.allMarkdownRemark.edges

  pages.forEach(p => {
    createPage({
      path: p.node.fields.slug,
      component: path.resolve(`./src/templates/` + section.template),
      context: {
        slug: p.node.fields.slug,
      },
    })
  })
}

const getAllMarkdownPagesFromCollection = async (collection, graphql) => {
  const result = await graphql(
    `
        {
            allMarkdownRemark(
            filter: { fields: {collection: {eq: "` +
      collection +
      `"}}}
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
            ) {
            edges {
                node {
                fields {
                    slug
                }
                frontmatter {
                    title
                }
                }
            }
            }
        }
        `
  )

  if (result.errors) {
    throw result.errors
  }

  return result
}
