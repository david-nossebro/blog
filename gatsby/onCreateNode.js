/* eslint-disable @typescript-eslint/no-var-requires */
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    // The "sourceInstanceName" is configured in the "gatsby-source-filesystem".
    // Markdownfiles from different folders will have different "sourceInstanceName"
    // configured. Markdown from different folders will be used for different things,
    // e.g. "blog" will contain blog items and "about" will contain markdown with content
    // for the about page. This value will be added to the MarkdownNode so that it can be
    // used in queries to filter content.
    const parent = getNode(node.parent)
    const collection = parent.sourceInstanceName
    createNodeField({
      name: `collection`,
      node,
      value: collection,
    })

    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
