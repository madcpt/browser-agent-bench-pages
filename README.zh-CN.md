# Browser Agent Bench — 交互榜单

[English](README.md) · **简体中文**

[打开线上页面](https://madcpt.github.io/browser-agent-bench-pages/?lang=zh)

展示 2026-11-16 评测快照的独立 GitHub Pages 网站。包含页面资源、三种工具的汇总数据，以及从原评测生成的公开任务定义和 UI 预览。不包含逐次结果、原始会话、凭据或判分实现。

## 中英文切换

页面顶部可选择中文或 English，选择会保存在当前浏览器。也可通过 `?lang=zh` 或 `?lang=en` 分享对应语言；`#task=<id>` 仍可直接定位任务。切换语言保留当前评分权重、任务筛选和所选阶段。

榜单、工具介绍、方法说明、任务标题和任务指令均提供中英文。原始组件控件、选项和目标值保留原文，避免翻译改变任务语义；预览提示和任务说明随所选语言切换。

## 本地预览

用静态服务器运行本目录，例如：

```sh
python3 -m http.server 4189 --bind 127.0.0.1
```

打开 `http://127.0.0.1:4189/`。网站运行无需安装构建依赖，无分析追踪和外部资源请求；官网链接需主动点击。

## 发布

GitHub Settings → Pages → Deploy from a branch → `main` / `(root)`。`.nojekyll` 表示按普通静态网站发布。

## 更新数据与翻译

- 修改 `app.js` 开头的三个已审阅汇总记录，以及 `index.html` 中的快照日期和条件；保持分组分母和 Token 类别一致。
- 页面文案翻译位于 `i18n.js`，任务中文译文位于 `task-translations.zh.json`，英文指令由原评测定义生成。
- 不要将原始日志或已移除的 `results/` 目录复制进此仓库。

默认质量分：单项 40% + 组合 30% + 长程 30%。Token 性价比：每个加权 Token 对应的质量分，最高者归一化为 100。综合分：质量 80% + Token 性价比 20%。Turnstile 官方测试模式单列。这是一次重复的探索性结果，不代表实际金额或稳定排名。

## 复用任务预览

`task-catalog.json` 和 `demo/assets/` 从原评测的任务 manifest、公开阶段说明及 React 组件生成，不包含评测记录或判分实现。

- 任务介绍直链：`#task=<id>`。
- 完整任务预览：`demo/lab.html?task=<id>&lang=zh`。

在本地评测源码目录已有构建依赖的前提下，重新生成：

```sh
node scripts/export-tasks.mjs ../browser-agent-bench
```

导出器记录来源 commit，仅替换静态预览存储适配器及资源路径，不修改原评测代码。预览草稿保存在本机，不产生判分；iframe 以同源方式展示，Turnstile 服务端验证需本地后端。`scripts/demo-api.js` 是预览设施，不是正式 grader。
