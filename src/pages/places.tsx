import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PlacesMap from "../components/places-map"
import { BottomDivider } from "../style/components.style"

const Places = ({ data }): JSX.Element => {
  const siteTitle: string = data.site.siteMetadata.title
  const geoJsonArray: Array<JSON> = createGeoJsonArray(data)

  return (
    <Layout title={siteTitle}>
      <SEO title="Places" />
      <PlacesMap height="450px" width="100%" geoJsonArray={geoJsonArray} />
      <BottomDivider />
    </Layout>
  )
}

export default Places

const createGeoJsonArray = (data): Array<JSON> => {
  const geoJsonArray = []
  data.allMarkdownRemark.edges.forEach(edge => {
    const geoJson = createGeoJson(edge.node)
    geoJsonArray.push(geoJson)
  })
  return geoJsonArray
}

const createGeoJson = (node): JSON => {
  const geoJson = JSON.parse(node.frontmatter.coordinates)
  geoJson.properties = {
    popup: true,
    slug: node.fields.slug,
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    content: node.frontmatter.description || node.excerpt,
  }
  return geoJson

  /*
  return (
    <div>
      <MarkerPopupTitle>
        <MarkerPopupTitleLink to={node.fields.slug}>
          {node.frontmatter.title}
        </MarkerPopupTitleLink>
      </MarkerPopupTitle>
      <Date>{node.frontmatter.date}</Date>
      <Content>{node.frontmatter.description || node.excerpt}</Content>
    </div>
  )
  */
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        fields: { collection: { eq: "blog" } }
        frontmatter: { coordinates: { ne: null } }
      }
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
            coordinates
          }
        }
      }
    }
  }
`
