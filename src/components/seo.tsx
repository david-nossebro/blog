import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface SEOProps {
  title: string
  description: string
  lang: string
  meta: Array<Meta>
}

interface Meta {
  name: string
  content: string
}

const SEO = ({ description, lang, meta, title }: SEOProps): JSX.Element => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              instagram
            }
          }
        }
      }
    `
  )

  const metaDescription: string = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title="Davids Gröna Band"
      titleTemplate={`%s | Davids Gröna Band`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `instagram:card`,
          content: `summary`,
        },
        {
          name: `instagram:creator`,
          content: "davidsgronaband",
        },
        {
          name: `instagram:title`,
          content: title,
        },
        {
          name: `instagram:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `sv`,
  meta: [
    "Davids Gröna Band",
    "davidsgrönaband",
    "davidsgronaband",
    "Gröna Bandet",
    "GB",
    "Green Ribbon",
    "Fjällfararnas Gröna och Vita Band",
    "Gröna Bandet 2021",
    "Vandring",
    "Fjällvandring",
    "Långvandring",
    "Friluftsliv",
    "Hike",
    "Kungsleden",
    "Padjelanta",
    "Padjelantaleden",
    "Fjällen",
    "Uteliv",
    "Grövelsjön",
    "Treriksröset",
    "Fjäderlätt",
    "Ultralight backpacking",
    "Lättviktspackning",
    "Lighterpack",
    "Lättviktsvandring",
    "Thru hike",
    "Thru-hike",
    "Thru hiking",
    "Thru-hiking",
    "Ultralight hiking gear",
    "Ultralight outdoor gear",
    "Friluftsutrustning",
  ],
  description: `Följ min vandring av Gröna Bandet. En promenad längs den skandinaviska bergsskedjan från Grövelsjön till Treriksröset.`,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
