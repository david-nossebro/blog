import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

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
        den här länken:
        <br />
        <a href="https://share.garmin.com/KZHUA">
          https://share.garmin.com/KZHUA
        </a>
        .
      </p>
      <iframe
        src="https://share.garmin.com/KZHUA"
        frameBorder="0"
        marginWidth="0"
        marginHeight="0"
        width="810"
        height="760"
      ></iframe>
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
