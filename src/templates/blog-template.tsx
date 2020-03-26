import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import BlogMap from "../components/blog-map"
import PreviousNextNavigation from "../components/previous-next-navigation"
import styled from "styled-components"
import graphQlQueries from "../utils/graphql-queries"

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

const BlogTemplate = ({ data, pageContext }): JSX.Element => {
  const { previous, next } = pageContext
  const siteTitle: string = data.site.siteMetadata.title
  const title: string = data.markdownRemark.frontmatter.title
  const description: string = data.markdownRemark.frontmatter.description
  const date: Date = data.markdownRemark.frontmatter.date
  const coordinates: Array<number> = data.markdownRemark.frontmatter.coordinates
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
        {coordinates && (
          <BlogMap height="350px" width="100%" position={coordinates} />
        )}
        <BottomDivider />
        <footer />
      </article>
      <PreviousNextNavigation previous={previous} next={next} />
    </Layout>
  )
}

export default BlogTemplate

export const pageQuery = graphQlQueries.BlogPostBySlug
