import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import styled from "styled-components"

const BottomDivider = styled.hr`
  margin-bottom: ${rhythm(1)};
`

const MarkdownPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const title = data.markdownRemark.frontmatter.title
  const description = data.markdownRemark.frontmatter.description
  const html = data.markdownRemark.html

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
