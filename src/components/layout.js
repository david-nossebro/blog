import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Navigation from "../components/navigation"
import Bio from "../components/bio"
import styled from "styled-components"

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

const SiteTitle = styled.h1({
  ...scale(1.5),
  marginBottom: rhythm(1),
  marginTop: 0,
})

const SiteTitleLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`

const Footer = styled.footer`
  font-size: 0.8em;
`

const Layout = ({ title, children }) => {

  return (
    <Container>
      <header>
        <SiteTitle>
          <SiteTitleLink to={`/`}>
            {title}
          </SiteTitleLink>
        </SiteTitle>
      </header>
      <Bio />
      <Navigation />
        <main>{children}</main>
      <Footer>
        © {new Date().getFullYear()}, Built with blood, sweat and tears (and some
        {` `}
        <Link to="/tools">tools</Link>)
      </Footer>
    </Container>
  )
}

export default Layout
