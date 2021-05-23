import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

import { rhythm, scale } from "../utils/typography"

const Wrapper = styled.div`
  display: flex;
  margin-bottom: ${rhythm(1 / 2)};
`

const BioImage = styled(Image)`
  margin-right: ${rhythm(1 / 2)};
  margin-top: auto;
  margin-bottom: auto;
`

const ImageLink = styled.a`
  box-shadow: none;
`

const BioText = styled.p`
  ${scale(0.001)};
  margin-top: auto;
  margin-bottom: auto;
  font-size: smaller;
  color: #525252;
`

interface Author {
  name: string
  summary: string
}

const Bio = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/jag.jpg/" }) {
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
          }
          social {
            instagram
          }
        }
      }
    }
  `)
  const { author }: { author: Author } = data.site.siteMetadata

  return (
    <Wrapper>
      {/* Could not get rid of the styling in here for some reason. The gatsby image tag is weird... */}
      <ImageLink
        href="https://www.instagram.com/davidsgronaband/"
        target="_blank"
        rel="noreferrer noopener"
      >
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
      </ImageLink>
      <BioText>
        Jag ska gå en promenad längs den skandinaviska bergskedjan. Här kommer
        ni kunna ta del av mitt äventyr (om ni har intresse för det).
      </BioText>
    </Wrapper>
  )
}

export default Bio
