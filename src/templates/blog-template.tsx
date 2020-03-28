import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import BlogMap from "../components/blog-map"
import PreviousNextNavigation from "../components/previous-next-navigation"
import styled from "styled-components"
import { BottomDivider } from "../style/components.style"

const BlogTitle = styled.h2`
  margin-top: ${rhythm(1)};
  margin-bottom: 0;
`

const BlogDate = styled.p`
  ${scale(-1 / 5)};

  display: block;
  margin-bottom: ${rhythm(1)};
`

const BlogTemplate = ({ data, pageContext }): JSX.Element => {
  const { previous, next } = pageContext
  const siteTitle: string = data.site.siteMetadata.title
  const title: string = data.markdownRemark.frontmatter.title
  const description: string = data.markdownRemark.frontmatter.description
  const date: Date = data.markdownRemark.frontmatter.date
  const position: Array<number> = getPosition(
    data.markdownRemark.frontmatter.coordinates
  )
  const html: string = data.markdownRemark.html

  return (
    <Layout title={siteTitle}>
      <SEO title={title} description={description} />
      <article>
        <header>
          <BlogTitle>{title}</BlogTitle>
          <BlogDate>{date}</BlogDate>
        </header>
        <section dangerouslySetInnerHTML={{ __html: html }} />
        {position && (
          <BlogMap height="350px" width="100%" position={position} />
        )}
        <BottomDivider />
        <footer />
      </article>
      <PreviousNextNavigation previous={previous} next={next} />
    </Layout>
  )
}

export default BlogTemplate

const getPosition = geoJsonString => {
  if (geoJsonString) {
    const geoJson = JSON.parse(geoJsonString)
    return geoJson.coordinates
  } else {
    return null
  }
}

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
