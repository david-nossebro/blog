import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Navigation from "../components/navigation"
import Bio from "../components/bio"

const Layout = ({ title, children }) => {

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      </header>
      <Bio />
      <Navigation />
      <main>{children}</main>
      <footer
        style={{
          fontSize: `0.8em`
        }}
      >
        © {new Date().getFullYear()}, Built with blood, sweat and tears (and some
        {` `}
        <Link to="/tools">tools</Link>)
      </footer>
    </div>
  )
}

export default Layout
