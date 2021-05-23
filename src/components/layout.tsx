import React, { Fragment } from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import Navigation from "./navigation"
import Bio from "./bio"
import styled from "styled-components"
import GlobalStyles from "../style/global.style"

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};

  h1 {
    ${scale(0.8)};
    margin-bottom: ${rhythm(1)};
    margin-top: 0;
  }

  footer {
    font-size: 0.8em;
  }
`

const SiteHeaderImage = styled.img`
  margin-bottom: 0.5em;
  width: 100%;
  height: 100%;
`

interface LayoutProps {
  title: string
  children: Array<JSX.Element>
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Fragment>
      <GlobalStyles />
      <Wrapper>
        <header>
          <SiteHeaderImage
            src="/header.jpg"
            alt="Grön banner med texten 'Davids Gröna Band, Grövelsjön - Abisko och kanske Treriksröset'. 
            I bakgrunden är ett berg med några träd i förgrunden. Bakom berget skymtar en sol. Färgerna går i grönt och gult."
          />
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
    </Fragment>
  )
}

export default Layout
