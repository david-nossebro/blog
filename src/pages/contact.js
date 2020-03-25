import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { Facebook, Instagram, Youtube, Slack, Gmail } from "@icons-pack/react-simple-icons"

import styled from "styled-components"
import {css} from "styled-components"

const iconStyle = css`
  width: 3em;
  height: 3em; 
  margin-right: 1em;
`

const FacebookIcon = styled(Facebook)`
  ${iconStyle}
`

const InstagramIcon = styled(Instagram)`
  ${iconStyle}
`

const YoutubeIcon = styled(Youtube)`
  ${iconStyle}
`

const SlackIcon = styled(Slack)`
  ${iconStyle}
`

const GmailIcon = styled(Gmail)`
  ${iconStyle}
`

const SocialLink = styled.a`
  box-shadow: none;
`

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
          <SocialLink href="https://instagram.com/david.nossebro/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon color="#E4405F" />
          </SocialLink>
          <YoutubeIcon color="#FF0000" />
          <SlackIcon color="#4A154B" />
          <FacebookIcon color="#1877F2" />
          <SocialLink href="mailto:david.nossebro@gmail.com">
            <GmailIcon color="#D14836" />
          </SocialLink>
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
