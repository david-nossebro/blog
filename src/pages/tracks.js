import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import LeafletMap from "../components/leaflet-map"

const Tracks = ({ data }) => {

  const siteTitle = data.site.siteMetadata.title

  const markers = []
  data.allMarkdownRemark.edges.forEach(edge => {

    console.log("This is coordinates: ", edge.node.frontmatter.coordinates)

    const plotContent = <div>
      <h2
        style={{
          marginTop: 0,
          marginBottom: rhythm(1 / 4),
        }}
      >
        <Link style={{ boxShadow: `none` }} to={edge.node.fields.slug}>
          {edge.node.frontmatter.title}
        </Link>
      </h2>
      <p>{edge.node.frontmatter.description || edge.node.excerpt}</p>
    </div>

    markers.push({
      position: edge.node.frontmatter.coordinates,
      content: plotContent
    })
  })
 
  /*
  const markers = [
    {
      position: [51.505, -0.09],
      content: <h3>Hejsan</h3>
    },
  ]
  */

  return (
    <Layout title={siteTitle}>
      <SEO title="Tracks" />
      <div className="leaflet-map-container">
        <LeafletMap markers={markers} />
      </div>
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
