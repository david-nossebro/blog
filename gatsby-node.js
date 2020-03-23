const { createPages } = require(`./gatsby/createPages`)
const { onCreateNode } = require(`./gatsby/onCreateNode`)

exports.createPages = createPages;
exports.onCreateNode = onCreateNode;