import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

export const AboutTemplate = ({
  title,
  postHtml,
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
        </header>
        <section dangerouslySetInnerHTML={{ __html: postHtml }} />
    </section>
  )
}

const About = ({ data, location }) => {

  const title = data.site.siteMetadata.title;
  const description = data.markdownRemark.frontmatter.description;

  return (
    <Layout location={location} title={title}>
      <SEO
        title={title}
        description={description}
      />
      <article>
        <AboutTemplate
            title={data.markdownRemark.frontmatter.title}
            postHtml={data.markdownRemark.html}
        />
        <hr
          style={{
            marginBottom: rhythm(1)
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query AboutBySlug($slug: String!) {
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
