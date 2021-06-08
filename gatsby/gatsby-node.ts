import createPages from "./gatsby-node-utils/createPages"
import onCreateNode from "./gatsby-node-utils/onCreateNode"

/*
const onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /leaflet/,
                        use: loaders.null()
                    }
                ]
            }
        })
    }
}
*/

export { createPages, onCreateNode }
