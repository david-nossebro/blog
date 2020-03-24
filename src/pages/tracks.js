import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Tracks = ({ data }) => {

  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO title="Contact" />
      <article>
       
      </article>
      <hr
        style={{
          marginBottom: rhythm(1)
        }}
      />
    </Layout>
  )
}

export default Tracks

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
