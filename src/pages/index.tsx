import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import styled from "styled-components"
import { BottomDivider } from "../style/components.style"

const BlogTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${rhythm(1 / 4)};
`

const BlogTitleLink = styled(Link)`
  box-shadow: none;
`

interface Node {
  node: Post
}

interface Post {
  frontmatter: Frontmatter
  fields: Fields
  excerpt: string
}

interface Frontmatter {
  title: string
  date: Date
  description: string
}

interface Fields {
  slug: string
}

const BlogIndex = ({ data }): JSX.Element => {
  const siteTitle: string = data.site.siteMetadata.title
  const posts: Array<Node> = data.allMarkdownRemark.edges

  return (
    <Layout title={siteTitle}>
      <SEO title="All posts" />
      <>
        {posts.map(({ node }: Node) => {
          const title: string = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <BlogTitle>
                  <BlogTitleLink to={node.fields.slug}>{title}</BlogTitleLink>
                </BlogTitle>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </>
      <BottomDivider />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
