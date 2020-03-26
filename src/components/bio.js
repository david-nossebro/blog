import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

import { rhythm } from "../utils/typography"

const Container = styled.div`
  display: flex;
  margin-bottom: ${rhythm(1 / 4)};
`

const BioImage = styled(Image)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
`

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/jag2.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            instagram
          }
        }
      }
    }
  `)
  const { author, social } = data.site.siteMetadata

  return (
    <Container>
      {/* Could not get rid of the styling in here for some reason. The gatsby image tag is weird... */}
      <BioImage
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          minWidth: 50,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Created by <strong>{author.name}</strong> {author.summary}
        {` `}
        You should follow him on {` `}
        <a href={`https://instagram.com/${social.instagram}`}>Instagram</a>.
      </p>
    </Container>
  )
}

export default Bio
