import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { BottomDivider } from "../style/components.style"
import styled from "styled-components"
import { Helmet } from "react-helmet"

const PixleeContainer = styled.div`
  padding-top: 2em;
  padding-bottom: 1em;
`

const InstagramFeed = ({ data }): JSX.Element => {
  const siteTitle: string = data.site.siteMetadata.title

  const [dateNow, setDateNow] = useState(Date.now())

  // Init Pixlee Social Feed
  useEffect(() => {
    console.log("Loding Pixlee Social Feed")

    window.PixleeAsyncInit = function() {
      Pixlee.init({ apiKey: "EdGORVRZh57pq_jbCsEB" })
      Pixlee.addSimpleWidget({ widgetId: "32861" })
    }

    if (document.getElementById("pixlee_script")) {
      // Hacky solution to make pixlee social feed reload...
      // There is probably a better solution then reloading the entire page.
      location.reload()
    } else {
      const scriptTag = document.createElement("script")
      scriptTag.src =
        "//instafeed.assets.pxlecdn.com/assets/pixlee_widget_1_0_0.js"
      scriptTag.id = "pixlee_script"
      document.body.appendChild(scriptTag)
    }
  }, [])

  return (
    <Layout title={siteTitle}>
      <SEO title="Instagram" />
      <div>
        Jag kommer försöka uppdatera och lägga upp bilder så ofta jag orkar och
        har mobiltäckning. Förhoppningsvis har jag också något vackert eller
        intressant att dela med mig av, men det är inte alls säkert.
        <br />
        <br />
        För den som har Instagram går det också att följa min vandring på kontot{" "}
        <a href="https://www.instagram.com/davidsgronaband/">
          {" "}
          davidsgronaband
        </a>
        .
      </div>
      <PixleeContainer>
        <div id="pixlee_container" />
      </PixleeContainer>
      <BottomDivider />
    </Layout>
  )
}

export default InstagramFeed

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
