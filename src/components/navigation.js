import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"

const Navigation = () => {

    const ulStyle = {
        listStyleType: `none`,
        margin: 0,
        padding: 0,
        marginBottom: rhythm(1),
    }

    const liStyle = {
        display: `inline`,
        padding: `8px`,
    }

    return (
        <ul style={ulStyle}>
            <li style={liStyle}><Link style={{ boxShadow: `none` }} to="/">Blog</Link></li>
            <li style={liStyle}><Link style={{ boxShadow: `none` }} to="/places">Places</Link></li>
            <li style={liStyle}><Link style={{ boxShadow: `none` }} to="/about">About</Link></li>
            <li style={liStyle}><Link style={{ boxShadow: `none` }} to="/contact">Contact</Link></li>
        </ul>
    )
}

export default Navigation