import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import styled from "styled-components"
import { BottomDivider } from "../style/components.style"

const HeaderSection = styled.header`
  margin-bottom: ${rhythm(1 / 4)};
`

const BlogTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
`

const BlogTitleLink = styled(Link)`
  box-shadow: none;
`

const Date = styled.small`
  ${scale(-1 / 5)};
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
              <HeaderSection>
                <BlogTitle>
                  <BlogTitleLink to={node.fields.slug}>{title}</BlogTitleLink>
                </BlogTitle>
                <Date>{node.frontmatter.date}</Date>
              </HeaderSection>
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
