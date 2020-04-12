const visit = require("unist-util-visit")
const toString = require("mdast-util-to-string")

const _ = require(`lodash`)

module.exports = ({ markdownAST }, pluginOptions) => {

    const terminal = pluginOptions && pluginOptions.terminal && pluginOptions.terminal !== '' ? pluginOptions.terminal : undefined

    visit(markdownAST, "code", node => {
        const text = toString(node)

        const html = `
        <deckgo-highlight-code ${node && node.lang !== null ? `language="${node.lang}"` : ''} ${terminal !== undefined ? `terminal="${terminal}"` : ''}>
          <code slot="code">${_.escape(text)}</code>
          <div style="
            position: relative;
            font-size: 14px;
            color: #A7B6C2;
            text-align: right;
            height: 1px;">
            <span style="top: -18px; position: relative;">${node.lang || ''}</span>
          </div>
        </deckgo-highlight-code>
      `

        node.type = "html"
        node.children = undefined
        node.value = html
    })

    return markdownAST
}
