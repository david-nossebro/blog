import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import PlacesMap from "../components/places-map"
import styled from "styled-components"

const MarkerPopupTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${rhythm(1 / 4)};
`

const MarkerPopupTitleLink = styled(Link)`
  box-shadow: none;
`

const BottomDivider = styled.hr`
  margin-bottom: ${rhythm(1)};
`

const Places = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const markers = createMarkers(data)

  return (
    <Layout title={siteTitle}>
      <SEO title="Places" />
      <PlacesMap height="450px" width="100%" markers={markers} />
      <BottomDivider />
    </Layout>
  )
}

export default Places

const createMarkers = data => {
  const markers = []
  data.allMarkdownRemark.edges.forEach(edge => {
    const plotContent = createPlotContent(edge.node)
    markers.push({
      position: edge.node.frontmatter.coordinates,
      title: edge.node.frontmatter.title,
      content: plotContent,
    })
  })
  return markers
}

const createPlotContent = node => {
  return (
    <div>
      <MarkerPopupTitle>
        <MarkerPopupTitleLink to={node.fields.slug}>
          {node.frontmatter.title}
        </MarkerPopupTitleLink>
      </MarkerPopupTitle>
      <small>{node.frontmatter.date}</small>
      <p>{node.frontmatter.description || node.excerpt}</p>
    </div>
  )
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
