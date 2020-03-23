import React from "react"
import { Link } from "gatsby"


const Navigation = () => {

    const ulStyle = {
        "list-style-type": `none`,
        margin: 0,
        padding: 0,
    }

    const liStyle = {
        display: `inline`,
        padding: `8px`,
    }

    return (
        <ul style={ulStyle}>
            <li style={liStyle}><Link to="/">Blog</Link></li>
            <li style={liStyle}><Link to="/tracks">Tracks</Link></li>
            <li style={liStyle}><Link to="/about">About</Link></li>
            <li style={liStyle}><Link to="/contact">Contact</Link></li>
        </ul>
    )
}

export default Navigation