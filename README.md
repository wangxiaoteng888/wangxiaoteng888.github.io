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
