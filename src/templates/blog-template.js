import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import BlogMap from "../components/blog-map"

export const BlogPostTemplate = ({
  date,
  title,
  postHtml,
  coordinates
}) => {
  return (
    <section>

        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: postHtml }} />
        { coordinates &&
          <BlogMap height="350px" width="100%" position={coordinates} />
        }
    </section>
  )
}

const BlogPost = ({ data, pageContext }) => {

  const { previous, next } = pageContext
  const title = data.site.siteMetadata.title;
  const description = data.markdownRemark.frontmatter.description;

  return (
    <Layout title={title}>
      <SEO
        title={title}
        description={description}
      />
      <article>
        <BlogPostTemplate
            date={data.markdownRemark.frontmatter.date}
            title={data.markdownRemark.frontmatter.title}
            coordinates={data.markdownRemark.frontmatter.coordinates}
            postHtml={data.markdownRemark.html}
        />
        <hr
          style={{
            marginBottom: rhythm(1)
          }}
        />
        <footer /> 
      </article>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
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
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPost

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
