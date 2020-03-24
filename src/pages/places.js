import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import PlacesMap from "../components/places-map"

const Places = ({ data }) => {

  const siteTitle = data.site.siteMetadata.title

  const markers = []
  data.allMarkdownRemark.edges.forEach(edge => {

    console.log("This is coordinates: ", edge.node.frontmatter.coordinates)

    const plotContent = <div>
      <h3
        style={{
          marginTop: 0,
          marginBottom: rhythm(1 / 4),
        }}
      >
        <Link style={{ boxShadow: `none` }} to={edge.node.fields.slug}>
          {edge.node.frontmatter.title}
        </Link>
      </h3>
      <small>{edge.node.frontmatter.date}</small>
      <p>{edge.node.frontmatter.description || edge.node.excerpt}</p>
    </div>

    markers.push({
      position: edge.node.frontmatter.coordinates,
      title: edge.node.frontmatter.title,
      content: plotContent
    })
  })
 
  return (
    <Layout title={siteTitle}>
      <SEO title="Places" />
      <PlacesMap height="450px" width="100%" markers={markers} />
      <hr
        style={{
          marginBottom: rhythm(1)
        }}
      />
    </Layout>
  )
}

export default Places

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { 
        fields: {collection: {eq: "blog"}},
        frontmatter:  {coordinates: {ne: null}},
      }
      sort: { fields: [frontmatter___date], order: DESC }) 
    {
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
            coordinates
          }
        }
      }
    }
  }
`
