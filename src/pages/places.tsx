import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
//import PlacesMap from "../components/places-map"
import { BottomDivider } from "../style/components.style"
import L from "leaflet"
import * as geojson from "geojson"
import GeoJson from "../types/GeoJson"
import PlacesMap from "../components/places-map"

const Places = ({ data }): JSX.Element => {
  const siteTitle: string = data.site.siteMetadata.title

  /*
  const featureCollection: geojson.FeatureCollection<geojson.Point> = createFeatureCollection(
    data
  )
  */

  /*
  return (
    <Layout title={siteTitle}>
      
      <SEO title="Places" />
      <Map height="450px" width="100%" featureCollection={featureCollection} />
      
      <PlacesMap
        height="450px"
        width="100%"
        featureCollection={featureCollection}
      />
      
      <BottomDivider />
    </Layout>
  )
  */

  return <h1>TODO</h1>
}

export default Places

const createFeatureCollection = (
  data
): geojson.FeatureCollection<geojson.Point> => {
  const featureCollection: geojson.FeatureCollection<geojson.Point> = {
    features: [],
    type: "FeatureCollection",
  }

  data.allMarkdownRemark.edges.forEach(edge => {
    const feature: geojson.Feature<geojson.Point> = createFeature(edge.node)
    featureCollection.features.push(feature)
  })
  return featureCollection
}

const createFeature = (node): geojson.Feature<geojson.Point> => {
  const geoJson: GeoJson = GeoJson.fromGeoJson(
    JSON.parse(node.frontmatter.coordinates)
  )
  console.log("GeoJson: ", geoJson)

  const leafletGeoJson: L.GeoJSON = L.geoJSON(
    JSON.parse(node.frontmatter.coordinates)
  )
  const featureCollection: geojson.FeatureCollection = leafletGeoJson.toGeoJSON() as geojson.FeatureCollection

  if (featureCollection.features.length !== 1) {
    throw new Error("A blog entry can only have one coordinate")
  }

  const feature: geojson.Feature = featureCollection.features[0]

  if (feature.geometry.type !== "Point") {
    throw new Error("A blog entry can only have coordinates as a point")
  }

  const featurePoint = feature as geojson.Feature<geojson.Point>

  feature.properties = {
    popup: true,
    slug: node.fields.slug,
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    content: node.frontmatter.description || node.excerpt,
  }

  return featurePoint
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
