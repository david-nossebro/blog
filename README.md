
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
[]  Add contact section
    [X] Add contact form
    []  Add social media links (partly done)  
[]  TEST - Add way to generate 1000 entries and see how the site behaves
[X]  Refactor CSS to styled-components
[X]  Create component for "SocialLinks" on contact page
[]  Create component for form on contact page
[]  Create component for Previous/Next navigation in blog-template
[]  Refactor to use typescript
[]  Add linting rules
    [] For code
    [] For style
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
[]  Add tags to blog entries, use in SEO
[]  Add different styles for different kind of blog entrie
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

https://analytics.google.com

https://openmaptiles.org/styles/
https://wiki.openstreetmap.org/wiki/Stylesheets
https://leaflet-extras.github.io/leaflet-providers/preview/

https://leaflet-extras.github.io/leaflet-providers/preview/#filter=Esri.WorldImagery -> Add image map as an alternative
https://react-leaflet.js.org

https://hiking.waymarkedtrails.org

https://github.com/automata/awesome-jamstack

https://github.com/Vagr9K/gatsby-advanced-starter