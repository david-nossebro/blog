import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { BottomDivider } from "../style/components.style"

const MarkdownPage = ({ data }): JSX.Element => {
  const siteTitle: string = data.site.siteMetadata.title
  const title: string = data.markdownRemark.frontmatter.title
  const description: string = data.markdownRemark.frontmatter.description
  const html: string = data.markdownRemark.html

  return (
    <Layout title={siteTitle}>
      <SEO title={title} description={description} />
      <article>
        <section dangerouslySetInnerHTML={{ __html: html }} />
        <BottomDivider />
        <footer />
      </article>
    </Layout>
  )
}

export default MarkdownPage

export const pageQuery = graphql`
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
`
