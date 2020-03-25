import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SocialLink from "../components/social-link"
import { rhythm } from "../utils/typography"
import styled from "styled-components"

const SuccessFormMessage = styled.span`
  color: green;
  margin-left: 0.5em;
`

const Contact = ({ data }) => {

  const siteTitle = data.site.siteMetadata.title

  let succesfulForm;
  if(typeof window !== `undefined`) {
    const urlParams = new URLSearchParams(window.location.search);
    succesfulForm = urlParams.get('submit-form') || false
  } else {
    succesfulForm = false
  }

  return (
    <Layout title={siteTitle}>
      <SEO title="Contact" />
      <article>
        <p>
          If you want to reach out to me, you can use any of the channels bellow.
        </p>

        <p>
          <SocialLink type="instagram" href="https://instagram.com/david.nossebro/" />
          <SocialLink type="youtube" href="https://todo.do" />
          <SocialLink type="slack" href="https://todo.do" />
          <SocialLink type="facebook" href="https://todo.do" />
          <SocialLink type="mail" href="https://todo.do" />
        </p>

        <p>
          Or you can use this form.
        </p>
        
        <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" action="/contact?submit-form=success">
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <label>Name <input type="text" name="name" /></label>
          </p>
          <p>
            <label>Email <input type="email" name="email" /></label>
          </p>
          <p>
            <label>Message <textarea rows = "5" cols = "60" name="message" /></label>
          </p>
          <p>
            <button type="submit">Send</button>
            {succesfulForm &&
              <SuccessFormMessage>
                The form was succesfully submitted, thank you!
              </SuccessFormMessage> 
            }
          </p>
        </form>

      </article>
      <hr
        style={{
          marginBottom: rhythm(1)
        }}
      />
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
