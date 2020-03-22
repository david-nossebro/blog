const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  createBlogPosts(graphql, createPage);
  createAboutPages(graphql, createPage);

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {

    // The "sourceInstanceName" is configured in the "gatsby-source-filesystem".
    // Markdownfiles from different folders will have different "sourceInstanceName"
    // configured. Markdown from different folders will be used for different things,
    // e.g. "blog" will contain blog items and "about" will contain markdown with content
    // for the about page. This value will be added to the MarkdownNode so that it can be
    // used in queries to filter content.
    const parent = getNode(node.parent);
    const collection = parent.sourceInstanceName;
    createNodeField({
      name: `collection`,
      node,
      "value": collection,
    })

    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    
  }
}

const createBlogPosts = async (graphql, createPage) => {

  const blogResult = await getAllBlogs(graphql)

  const blogPosts = blogResult.data.allMarkdownRemark.edges

  blogPosts.forEach((post, index) => {
    const previous = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
    const next = index === 0 ? null : blogPosts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

const getAllBlogs = async (graphql) => {
  const result = await graphql(`
    {
        allMarkdownRemark(
        filter: { fields: {collection: {eq: "blog"}}}
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
    throw blogResult.errors
  }

  return result;
}

const createAboutPages = async (graphql, createPage) => {
  const aboutResult = await getAllAbout(graphql)

  const aboutPages = aboutResult.data.allMarkdownRemark.edges

  aboutPages.forEach(aboutPage => {
    createPage({
      path: aboutPage.node.fields.slug,
      component: path.resolve(`./src/templates/about-template.js`),
      context: {
        slug: aboutPage.node.fields.slug,
      },
    })
  })
}

const getAllAbout = async (graphql) => {
  const result = await graphql(`
    {
        allMarkdownRemark(
        filter: { fields: {collection: {eq: "about"}}}
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
    throw blogResult.errors
  }

  return result;
}
