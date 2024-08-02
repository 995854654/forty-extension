# Chrome Extension

official document: `https://developer.chrome.com/docs/extensions?hl=zh-cn`

# 如何调试panel页面
访问 `http://localhost:3000/sidePanel.html`

# 项目介绍
1. 该项目提供了侧边栏，新页面，popup,上下文, background, content等功能
2. 支持typescript


# 开发进度

- chatPage
    - 基本的chatbot聊天(已完成)

- downloadPage
    - 输入url，能够与后端互动，添加信息在表格中
    - 完善后端下载器，能够下载youtube、bilibili等视频


# 场景
1. 在chatbox输入下载 `https://xxxx.com/xxx`的资源，则会创建下载任务，在downloader页面中查看的到
2. 在chatbox输入查询xxxx的资源，则会去所支持的平台搜索资源，并提供以下资源下载。

# 开发日志

需要优化：

1. chatBox的高度应该随着屏幕的宽度，以及缩放比例调整，目前是固定65vh.
2. 

# idea

1. youtube视频下载器
2. chatbot
3. 用户输入prompt，生成各种资源的合集。比如： 用户输入比亚迪，则agent会去各个平台搜索资源



# 如何使用

1. 修改`public/_locales/zh_CN`的`runEnvironment`, 仅支持`location`和`website`
