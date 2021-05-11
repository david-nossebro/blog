import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import styled from "styled-components"

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(1)};
`

const ListItem = styled.li`
  display: inline;
  padding-right: 0.8em;

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
        <NavLink to="/" activeClassName="active">Instagram</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/position" activeClassName="active">
          Position
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/route" activeClassName="active">
          Färdplan
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/foodplan" activeClassName="active">
          Matplan
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/gear" activeClassName="active">
          Utrustning
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/contact" activeClassName="active">
          Kontakt
        </NavLink>
      </ListItem>
    </List>
  )
}

export default Navigation
