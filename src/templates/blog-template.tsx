import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import BlogMap from "../components/blog-map"
import styled from "styled-components"

const BlogTitle = styled.h1`
  margin-top: ${rhythm(1)};
  margin-bottom: 0;
`

const BlogDate = styled.p({
  ...scale(-1 / 5),
  display: `block`,
  marginBottom: rhythm(1),
})

const BottomDivider = styled.hr`
  margin-bottom: ${rhythm(1)};
`

const NextPreviousNavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

const BlogTemplate = ({ data, pageContext }) => {
  const { previous, next } = pageContext
  const siteTitle = data.site.siteMetadata.title
  const title = data.markdownRemark.frontmatter.title
  const description = data.markdownRemark.frontmatter.description
  const date = data.markdownRemark.frontmatter.date
  const coordinates = data.markdownRemark.frontmatter.coordinates
  const html = data.markdownRemark.html

  return (
    <Layout title={siteTitle}>
      <SEO title={title} description={description} />
      <article>
        <header>
          <BlogTitle>{title}</BlogTitle>
          <BlogDate>{date}</BlogDate>
        </header>
        <section dangerouslySetInnerHTML={{ __html: html }} />
        {coordinates && (
          <BlogMap height="350px" width="100%" position={coordinates} />
        )}
        <BottomDivider />
        <footer />
      </article>
      <nav>
        <NextPreviousNavList>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </NextPreviousNavList>
      </nav>
    </Layout>
  )
}

export default BlogTemplate

export const pageQuery = graphql`
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
`
