# 张量实验室

网站：<https://wangxiaoteng888.github.io/>

用可交互的矩阵、张量形状和数据流图，一步一步理解 MHA、MLA 与 DSA。
首页提供完整目录；每个教程都带有相同的侧边栏，手机上可以通过顶部「目录」打开。
既有教程地址继续有效。

## 网站文件

- `index.html`：实验室首页。
- `assets/catalog.js`：统一目录配置，控制首页列表和侧边栏的分组、名称、顺序、简介与路径。
- `assets/navigation.js`、`assets/navigation.css`：所有页面共用的响应式导航。
- `assets/home.js`、`assets/home.css`：首页目录与样式。
- `assets/discussions.js`：页面底部讨论区，从 GitHub 读取公开留言。
- `assets/discussions.json`：每个页面与 GitHub Issue 讨论帖的对应关系。
- `mha-tensor-lab/`：MHA、MLA、DSA 教程及 SVG、PNG 图。

## 增加一个网页

1. 将 HTML 和它引用的资源放到 `mha-tensor-lab/` 下。请使用相对链接。
2. 在 `assets/catalog.js` 对应分组的 `pages` 中加入 `id`、`title`、`description`、`type`、`path`；`id` 必须唯一。
3. 在新 HTML 的 `</head>` 前加入：

   ```html
   <link rel="stylesheet" href="../assets/navigation.css">
   <script src="../assets/catalog.js" defer></script>
   <script src="../assets/navigation.js" defer></script>
   ```

4. 给新页面的 `<body>` 加上 `data-lab-page="目录中对应的id"`。
5. 提交并推送到 `main`，GitHub Pages 会自动发布。首页与侧边栏会一起更新，无需逐页修改目录。

页面使用原生 HTML、CSS 和 JavaScript，无需安装依赖或构建。
GitHub Pages 从 `main` 分支的根目录发布。

## 管理讨论区

首页与每个教程都有独立的讨论帖。读者在网页内查看留言，通过「参与讨论」进入 GitHub 登录、发言和回复，再回到网页点击「刷新留言」读取最新内容。

在仓库的 [site-discussion 标签](https://github.com/wangxiaoteng888/wangxiaoteng888.github.io/issues?q=label%3Asite-discussion) 下统一管理评论。讨论区显示最近一页（最多 30 条）留言，完整内容保留在 GitHub；留言以纯文本显示，原有 Markdown 格式可在 GitHub 查看。

新增网页时，可在仓库创建带 `site-discussion` 标签的 Issue，并把编号加入 `assets/discussions.json` 的对应页面 ID。导航组件会自动加载讨论区，不需要给每个 HTML 重复添加代码。

网页使用公开 GitHub API，不包含密钥。留言在读者接近页面底部时加载，短暂缓存在当前浏览器会话中；网络或 API 限流时，GitHub 讨论链接仍可使用。
