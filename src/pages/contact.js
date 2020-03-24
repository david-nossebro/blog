import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { Facebook, Instagram, Youtube, Slack, Gmail } from "@icons-pack/react-simple-icons"

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
          <a href="https://instagram.com/david.nossebro/" target="_blank" rel="noopener noreferrer">
            <Instagram color="#E4405F" style={{width: `3em`, height: `3em`, marginRight: `1em`}} />
          </a>
          <Youtube color="#FF0000" style={{width: `3em`, height: `3em`, marginRight: `1em`}} />
          <Slack color="#4A154B" style={{width: `3em`, height: `3em`, marginRight: `1em`}} />
          <Facebook color="#1877F2" style={{width: `3em`, height: `3em`, marginRight: `1em`}} />
          <a href="mailto:david.nossebro@gmail.com">
            <Gmail color="#D14836" style={{width: `3em`, height: `3em`, marginRight: `1em`}} />
          </a>
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
              <span
                style={{
                  color: `green`,
                  marginLeft: `0.5em`
                }}
              >
                The form was succesfully submitted, thank you!
              </span> 
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
