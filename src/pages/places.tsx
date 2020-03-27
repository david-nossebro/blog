import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import typography, { rhythm, scale } from "../utils/typography"
import PlacesMap, { MarkerPoint } from "../components/places-map"
import styled from "styled-components"
import { BottomDivider } from "../style/components.style"

const MarkerPopupTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${rhythm(1 / 4)};
`

const MarkerPopupTitleLink = styled(Link)`
  box-shadow: none;
`

const Date = styled.small`
  font-weight: 100;
  color: grey;
  font-family: ${typography.toJSON().body.fontFamily};
  font-size: 13px;
`

const Content = styled.p`
  font-family: ${typography.toJSON().body.fontFamily};
  font-size: 14px;
`

const Places = ({ data }): JSX.Element => {
  const siteTitle: string = data.site.siteMetadata.title
  const markers: Array<MarkerPoint> = createMarkers(data)

  return (
    <Layout title={siteTitle}>
      <SEO title="Places" />
      <PlacesMap height="450px" width="100%" markers={markers} />
      <BottomDivider />
    </Layout>
  )
}

export default Places

const createMarkers = (data): Array<MarkerPoint> => {
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

const createPlotContent = (node): JSX.Element => {
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
