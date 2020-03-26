import { graphql } from "gatsby"

const queries = {
  BlogPostBySlug: graphql`
    query BlogPostBySlug($slug: String!) {
      site {
        siteMetadata {
          title
        }
      }
      markdownRemark(fields: { slug: { eq: $slug } }) {
        id
        excerpt(pruneLength: 160)
        html
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
          coordinates
        }
      }
    }
  `,
  MarkdownPageBySlug: graphql`
    query MarkdownPageBySlug($slug: String!) {
      site {
        siteMetadata {
          title
        }
      }
      markdownRemark(fields: { slug: { eq: $slug } }) {
        id
        excerpt(pruneLength: 160)
        html
        frontmatter {
          title
          description
        }
      }
    }
  `,
}

export default queries
