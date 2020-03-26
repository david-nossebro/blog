import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const NextPreviousNavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

const PreviousNextNavigation = ({ previous, next }): JSX.Element => {
  return (
    <nav>
      <NextPreviousNavList>
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </NextPreviousNavList>
    </nav>
  )
}

export default PreviousNextNavigation
