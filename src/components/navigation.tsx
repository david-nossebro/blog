import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import styled from "styled-components"

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-bottom: ${rhythm(1)};
`

const ListItem = styled.li`
  display: inline;
  padding-right: 0.7em;

  .active {
    box-shadow: 0 1px 0 0 currentColor;
  }
`

const NavLink = styled(Link)`
  box-shadow: none;

  :hover {
    box-shadow: 0 1px 0 0 currentColor;
  }
`

const Navigation = (): JSX.Element => {



  return (
    <List>
      <ListItem>
        <NavLink to="/">Blog</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/places" activeClassName="active">Places</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/about" activeClassName="active">About</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/contact" activeClassName="active">Contact</NavLink>
      </ListItem>
    </List>
  )
}

export default Navigation
