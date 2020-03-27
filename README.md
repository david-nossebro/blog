
TODO

[X] Netlify cms with images
[X]  Netlify cms with Google login
[X]  Register with google analytics
[]  Add about section
    [X] First working draft
    [X]  Add about to netlify cms
    [X]  Refactor gatsby-node.js and split into separate files
    [X]  Make markdown types configurable (e.g. "blog" and "about")
    []  Break out graphql queries to a reusable util
        [] Look into graphql fragments and best practices for structure
[]  Add contact section
    [X] Add contact form
    [X]  Add social media links
    []  Set social media links
    []  Style form
[]  TEST - Add way to generate 1000 entries and see how the site behaves
[X]  Refactor CSS to styled-components
[X]  Create component for "SocialLinks" on contact page
[X]  Create component for form on contact page
[X]  Create component for Previous/Next navigation in blog-template
[]  Refactor to use typescript
    [X]  Add tooling
    [X]  Refactor codebase
    []  Add types for graphql result
    []  Structure types
[X]  Structure styled-components so its possible to share common components
[X]  Add linting rules
    [X] For code
    [X] For style
[]  Plot blog entries to map
    [X]  Add OpenStreetMap to new "Tracks" map
    [X]  Plot blog entries with location to map
    [X]  Fix zoom and location for map
    [X]  Add map to blog entries with a location
    [X]  Add support for "fullscreen" map
    [X]  Add support for "flight picture" layer
    []  Add support for adding plot to map in netlify cms (if possible through a widget?)
    []  Add support for plotting routes on blog-map
    []  Add support for multiple plot types on blog-map (e.g. Camp, View, Bath etc, idea is to have something pretty generic)
    []  If two plots are close to each other, they can be merged under the same plot
[]  Add popup viewer when clicking images (currently opened in new tab)
[]  Add tags to blog entries, use in SEO
[]  Add different styles for different kind of blog entries
    []  Adventure
    []  Gear review
    []  Recipe
[]  Show if a blog entry has a map
[]  Investigate support for scheduled publishing
[]  Add English and Swedish support (https://www.gatsbyjs.org/blog/2017-10-17-building-i18n-with-gatsby/)
[]  Find domain name (check if free on social media as well)
[]  Optimize lighthouse score (https://developers.google.com/web/tools/lighthouse)
[]  Investigate how to optimize google index - Sitemap?
[]  Add link to RSS feed (/rss.xml) and information about how to use it.
[]  Investigate ways to let people support (Patreon, Affiliators links to gear, https://ko-fi.com/ etc)
[]  Add commenting support
[]  Add search functionality
[]  Choose typography style - https://kyleamathews.github.io/typography.js/
[]  Investigate if possible to integrate with Garmin InReach (Is there an API?)
[]  Think about how to add a "trip" and track it on the blog. (e.g. Distance left and Distance covered)


Add content

[]  About
    []  SE
    []  EN
[]  Tools
    []  SE
    []  EN
[]  Contact
    []  SE
    []  EN
[]  First blog entry
    []  SE
    []  EN

 
IDEAS

For the map, add a section called "Follow my tracks" with a map. Plot all blog entries
where location has been added. In the blog view if location is added also add a link "show on map".

Domains
walkidiotwalk.com


LINKS:

https://github.com/gatsbyjs/gatsby/issues/18983 -> Native TS support in Gatsby
https://github.com/styled-components/awesome-styled-components

https://analytics.google.com

https://openmaptiles.org/styles/
https://wiki.openstreetmap.org/wiki/Stylesheets
https://leaflet-extras.github.io/leaflet-providers/preview/

https://leaflet-extras.github.io/leaflet-providers/preview/#filter=Esri.WorldImagery -> Add image map as an alternative
https://react-leaflet.js.org

https://hiking.waymarkedtrails.org

https://github.com/automata/awesome-jamstack

https://github.com/Vagr9K/gatsby-advanced-starter

Lantmäteriet med leaflet
https://github.com/kontrollanten/lantmateriet-leaflet
https://github.com/fredriklindmark/lantmateriet_wmts

vildmarkskartan.se - Bra domän. Idéen är en karta där vem som helst kan lägga in tips platser för friluftsliv. 

https://www.gatsbyjs.org/packages/gatsby-remark-numbered-footnotes
https://www.gatsbyjs.org/packages/gatsby-remark-reading-time
https://www.gatsbyjs.org/packages/gatsby-remark-lazy-load
https://www.gatsbyjs.org/packages/gatsby-remark-responsive-image
https://www.gatsbyjs.org/packages/gatsby-remark-embed-spotify

https://gatsby-starter-bee.netlify.com/
https://www.gatsbyjs.org/starters/passwd10/gatsby-starter-answer/

https://github.com/jackbravo/gatsby-starter-i18n-blog