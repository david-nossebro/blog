import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SocialLink from "../components/social-link"
import ContactForm from "../components/contact-form"
import { BottomDivider } from "../style/components.style"

const Contact = ({ data }): JSX.Element => {
  const siteTitle: string = data.site.siteMetadata.title

  let succesfulForm: boolean
  if (typeof window !== `undefined`) {
    const urlParams = new URLSearchParams(window.location.search)
    succesfulForm = urlParams.get("form-success") === "true" || false
  } else {
    succesfulForm = false
  }

  return (
    <Layout title={siteTitle}>
      <SEO title="Kontakt" />
      <article>
        <p>
          Om ni vill heja på med glada tillrop, säga hej eller av annan
          anledning komma i kontakt med mig går det att göra via nedanstående
          kanaler eller formuläret.
        </p>
        <p>
          <SocialLink
            type="instagram"
            href="https://www.instagram.com/davidsgronaband/"
          />
          <SocialLink
            type="facebook"
            href="https://www.facebook.com/david.nossebro"
          />
          <SocialLink type="phone" href="tel:+46768583302" />
        </p>
        <ContactForm success={succesfulForm} />
      </article>
      <BottomDivider />
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
