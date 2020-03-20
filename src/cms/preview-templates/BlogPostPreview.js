import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => {
  return (
    <BlogPostTemplate
        postHtml={widgetFor('body')}
        description={entry.getIn(['data', 'description'])}
        title={entry.getIn(['data', 'title'])}
        date={entry.getIn(['data', 'date'])}
    />
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview