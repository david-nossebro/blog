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
    padding: 0.5em;
`

const NavLink = styled(Link)`
    box-shadow: none;
`

const Navigation = () => {
    return (
        <List>
            <ListItem><NavLink to="/">Blog</NavLink></ListItem>
            <ListItem><NavLink to="/places">Places</NavLink></ListItem>
            <ListItem><NavLink to="/about">About</NavLink></ListItem>
            <ListItem><NavLink to="/contact">Contact</NavLink></ListItem>
        </List>
    )
}

export default Navigation