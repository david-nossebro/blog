import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import Navigation from "./navigation"
import Bio from "./bio"
import styled from "styled-components"

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};

  h1 {
    ${scale(1.5)};
    margin-bottom: ${rhythm(1)};
    margin-top: 0;
  }

  footer {
    font-size: 0.8em;
  }
`

const SiteTitleLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`

interface LayoutProps {
  title: string
  children: Array<JSX.Element>
}

const Layout = ({ title, children }: LayoutProps): JSX.Element => {
  return (
    <Wrapper>
      <header>
        <h1>
          <SiteTitleLink to={`/`}>{title}</SiteTitleLink>
        </h1>
      </header>
      <Bio />
      <Navigation />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with blood, sweat and tears (and
        some
        {` `}
        <Link to="/tools">tools</Link>)
      </footer>
    </Wrapper>
  )
}

export default Layout
