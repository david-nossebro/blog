import React from "react"
import { Link } from "gatsby"


const Navigation = () => {

    return (
        <ul>
            <li><Link to="/">Blog</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
    )
}

export default Navigation