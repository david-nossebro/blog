import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet"
import { BottomDivider } from "../style/components.style"

const gear = ({ data }): JSX.Element => {
  const siteTitle: string = data.site.siteMetadata.title

  const [lighterpackLoaded, setLighterpackLoaded] = useState(false)

  const checkWhenLighterpackIsLoaded = async () => {
    while (
      !document.querySelector("li.lpRow:nth-child(1) > span:nth-child(2)")
    ) {
      await new Promise(r => setTimeout(r, 500))
    }

    setLighterpackLoaded(true)
  }

  useEffect(() => {
    const scriptTag = document.createElement("script")
    scriptTag.src = "https://lighterpack.com/e/fjtemo"
    scriptTag.async = false
    document.body.appendChild(scriptTag)
    //scriptTag.addEventListener("load", () => setLighterpackLoaded(true))
    checkWhenLighterpackIsLoaded()
  }, [])

  // Translate Lighterpack to Swedish
  useEffect(() => {
    if (!lighterpackLoaded) {
      return
    }

    document.querySelector(
      "li.lpRow:nth-child(1) > span:nth-child(2)"
    ).innerHTML = "Kategori"

    document.querySelector(
      "li.lpRow:nth-child(1) > span:nth-child(3)"
    ).innerHTML = "Vikt"

    document.querySelector(
      "li.lpRow:nth-child(14) > span:nth-child(2)"
    ).innerHTML = "Förbrukningsvaror"

    document.querySelector(
      "li.lpRow:nth-child(15) > span:nth-child(2)"
    ).innerHTML = "Kläder på kroppen"

    document.querySelector(
      "li.lpRow:nth-child(16) > span:nth-child(2)"
    ).innerHTML = "Basvikt"

    document.querySelector(
      "#\\33 19 > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2)"
    ).innerHTML = "Vikt"

    document.querySelector(
      "#\\33 20 > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2)"
    ).innerHTML = "Vikt"

    document.querySelector(
      "#\\33 21 > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2)"
    ).innerHTML = "Vikt"

    document.querySelector(
      "#\\33 22 > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2)"
    ).innerHTML = "Vikt"

    document.querySelector(
      "#\\33 94 > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2)"
    ).innerHTML = "Vikt"

    document.querySelector(
      "#\\33 23 > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2)"
    ).innerHTML = "Vikt"

    document.querySelector(
      "#\\33 24 > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2)"
    ).innerHTML = "Vikt"

    document.querySelector(
      "#\\33 42 > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2)"
    ).innerHTML = "Vikt"

    document.querySelector(
      "#\\34 00 > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2)"
    ).innerHTML = "Vikt"

    document.querySelector(
      "#\\34 17 > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2)"
    ).innerHTML = "Vikt"

    document.querySelector(
      "#\\34 07 > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2)"
    ).innerHTML = "Vikt"
  }, [lighterpackLoaded])

  return (
    <Layout title={siteTitle}>
      <SEO title="Utrustning" />
      <p>
        Inför den här resan har jag försökt banta min packning så mycket som
        möjligt. Delvis för att jag ska klara göra så långa dagsetapper som
        möjligt och öka mina chanser att ta mig hela vägen (jag har ganska
        begränsad tid för min vandring). Den andra och största anledningen är
        att jag tycker det är enormt kul att nörda ner mig i friluftsprylar. Det
        ger mig möjlighet att drömma om min äventyr medans jag sitter hemma
        fastkedjad av vardagens måsten.
        <br />
        <br />
        När man pratar om packvikt brukar man dela upp packningen i basvikt och
        förbrukningsvaror, där basvikten är de prylar man alltid kommer behöva
        bära med sig och förbrukningsvaror är saker som mat, vatten och
        toapapper. Min basvikt har jag lyckats få ner till ungefär 5kg, vilket
        jag är mycket nöjd med. Under Gröna Bandet kommer maximala vikten på min
        ryggsäck vara ungefär 10kg. Jag räknar då med att den längsta sträckan
        mellan proviantering kommer vara 6 dagar och att förbrukningsvaror för
        en dag väger ungefär 700 gram. Sedan har jag adderat en dag extra ifall
        något oförutsett händer längs vägen som gör att det tar längre tid.
        <br />
        <br />
        För att sammanställa min packlista har jag använt mig av en hemsida som
        heter <a href="https://lighterpack.com">lighterpack</a>. Här kan man
        lägga in alla sina prylar och dess vikt samt dela in de i olika
        kategorier för att få en översikt. Här nedan kan ni se min lista, men ni
        kan också hitta den hos lighterpack på den här{" "}
        <a href="https://lighterpack.com/r/fjtemo">länken</a>.
      </p>
      <h3>Lighterpack</h3>
      <div id="fjtemo"></div>
      <BottomDivider />
    </Layout>
  )
}

export default gear

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
