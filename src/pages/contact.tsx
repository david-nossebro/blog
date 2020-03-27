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
      <SEO title="Contact" />
      <article>
        <p>
          If you want to reach out to me, you can use any of the channels
          bellow.
        </p>
        <p>
          <SocialLink
            type="instagram"
            href="https://instagram.com/david.nossebro/"
          />
          <SocialLink type="youtube" href="https://todo.do" />
          <SocialLink type="slack" href="https://todo.do" />
          <SocialLink type="facebook" href="https://todo.do" />
          <SocialLink type="mail" href="https://todo.do" />
        </p>
        <p>Or you can use this form.</p>
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
