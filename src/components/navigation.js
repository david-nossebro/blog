import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Navigation = () => {
  const data = useStaticQuery(graphql`
    query SiteMetaQuery {
      site {
        siteMetadata {
          markdownPageSections {
              name
          }
        }
      }
    }
  `)

  const menuItems = []
  data.site.siteMetadata.markdownPageSections.forEach(section => {
    menuItems.push(<li key={section.name.toLowerCase()}><Link to={"/" + section.name.toLowerCase()}>{section.name}</Link></li>)
  })

  return (
    <ul>
      <li key="blog">
        <Link to="/">Blog</Link>
      </li>
      {menuItems}
    </ul>
  )
}

export default Navigation
