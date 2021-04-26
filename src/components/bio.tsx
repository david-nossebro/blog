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

interface Social {
  instagram: string
}

const Bio = (): JSX.Element => {
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
  const { author }: { author: Author } = data.site.siteMetadata
  const { social }: { social: Social } = data.site.siteMetadata

  return (
    <Wrapper>
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
      <BioText>
        En vandring längs den skandinaviska bergskedjan från Grövelsjön till
        Abisko (och Treriksröset om jag kommer så långt).
      </BioText>
    </Wrapper>
  )
}

export default Bio
