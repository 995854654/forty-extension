const paths = require('./config/paths');
const path = require('path');
module.exports = {
    // 入口文件
    entry: {
        // popup
        main: paths.appIndexJs,
        // content_script
        content: "./src/content/index.js",
        background: "./src/background/index.js",
        // sidePanel
        panel: "./src/sidePanel/index.js",
        // newTab
        options: "./src/options/index.js"
    },
    moduleFileExtensions: ['web.mjs', 'mjs', 'web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'json', 'web.jsx', 'jsx'],
    alias: {
        "@": path.join(__dirname, "src")
    },
    // 输出html文件
    pages: [
        {
            meta: "popup",
            filename: "index.html",
            // 对应entry里的参数
            entryName: "main"
        },
        {
            meta: "侧边栏",
            filename: "sidePanel.html",
            entryName: "panel"
        },
        {
            meta: "newTab",
            filename: "options.html",
            entryName: "options"
        }
    ]


}