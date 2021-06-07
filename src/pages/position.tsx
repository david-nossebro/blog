import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PositionMap from "../components/position-map"

const Position = ({ data }): JSX.Element => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO title="Position" />
      <p>
        Här kan ni se hur det går för mig och var jag befinner mig just nu. Jag
        bär med mig en Garmin InReach vilket är en GPS/Nödsändare som man kan
        skicka meddelanden via{" "}
        <a href="https://sv.wikipedia.org/wiki/Iridium_(satellittelefoni)">
          Iridium
        </a>{" "}
        med. Med hjälp av den kommer jag kunna dela min position under hela min
        tur (förutsatt att jag har batteri kvar).
        <br />
        <br />
        Ser kartan nedan konstig ut på din enhet går den även att komma på via
        den här länken:{" "}
        <a
          href="https://share.garmin.com/davidsgronaband"
          rel="noreferrer noopener"
        >
          https://share.garmin.com/davidsgronaband
        </a>
        .
      </p>

      <PositionMap />

    </Layout>
  )
}

export default Position

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
