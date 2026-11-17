(() => {
  const en = {
    'Browser Agent Bench — 交互榜单':'Browser Agent Bench — Interactive leaderboard',
    'ego browser、BrowserSkill 与 Kitesurf 的本地浏览器 Agent 实测对比：任务完成质量、Token 效率与可调整的综合评分。':'A local browser-agent comparison of ego browser, BrowserSkill and Kitesurf: task quality, token efficiency and adjustable composite scores.',
    '跳转到榜单':'Skip to leaderboard','主导航':'Main navigation','探索任务':'Explore tasks','评分方法':'Methodology','能完成，':'Completion first.','才值得比较。':'Then compare.',
    'ego browser、BrowserSkill 与 Kitesurf 的同题实测。把任务完成质量和 Token 效率放在一起看，权重由你决定。':'The same tasks for ego browser, BrowserSkill and Kitesurf. Compare completion quality with token efficiency, using weights you choose.',
    '22 个任务 / 工具':'22 tasks / tool','每项 1 次 · Seed 42':'1 repetition · Seed 42','三种工具，一套标尺。':'Three tools. One yardstick.','主榜只含 18 项功能任务':'Main scores cover 18 functional tasks',
    '综合分':'Composite score','图表指标':'Chart metric','综合':'Composite','质量':'Quality','Token 效率':'Token efficiency','质量分与 Token 性价比指数的加权平均。':'A weighted average of task quality and the token-value index.',
    '评分参数':'Score parameters','你的评判标准':'Your priorities','恢复默认':'Reset defaults','质量权重':'Quality weight','偏重 Token 效率':'Token efficiency','偏重完成质量':'Task quality','Token 相对成本':'Relative token cost','未缓存输入固定为 1；默认所有 Token 等权。':'Uncached input is fixed at 1. All tokens have equal weight by default.','缓存输入':'Cached input','输出':'Output','可按相对计费比率调节；此处不代表实际美元价格。':'Adjust relative cost ratios. These are not actual dollar prices.',
    '功能任务评分和原始 Token 汇总':'Functional task scores and original token totals','工具':'Tool','功能通过':'Functional passes','质量分':'Quality','Token 性价比':'Token value','Token / 百万':'Tokens / million','Turnstile 测试':'Turnstile tests',
    '有效失败尝试的消耗全部计入。Turnstile 官方测试模式单列，不参与主榜评分。':'All valid failed attempts count toward consumption. Official Turnstile test modes are shown separately and excluded from the main score.',
    '认识三种工具。':'Meet the tools.','基于 Chromium 的 Agent 浏览器，通过 ego-browser CLI / skill 连接 Agent，可沿用登录状态，并在独立任务空间中与用户协作。':'A Chromium-based agent browser, connected through the ego-browser CLI / skill. Reuses signed-in sessions and supports collaboration in separate task spaces.',
    '腾讯开源的 CLI 与浏览器扩展，将 Agent 接入已有的 Chrome / Edge，使用现有登录状态完成读取、点击、填写等操作。':'Tencent’s open-source CLI and browser extension connect agents to existing Chrome / Edge sessions for reading, clicking and filling forms.',
    'Cloudflare 面向 AI Agent 的实验性浏览器引擎，可在 Workers 中运行，支持 CDP；本次使用本地实例和自定义适配器。':'Cloudflare’s experimental browser engine for AI agents runs on Workers and supports CDP. This comparison uses a local instance and a custom adapter.','官网 ↗':'Official site ↗',
    '不止会点按钮。':'Beyond clicking buttons.','单项组件':'Single components','表单、日期、虚拟表格、树、弹层、拖拽、富文本、iframe / Shadow DOM、代码与图形编辑器、文件流和故障恢复。':'Forms, dates, virtual tables, trees, layers, drag-and-drop, rich text, iframe / Shadow DOM, code and graphical editors, file workflows and fault recovery.',
    '组合任务':'Combinations','每项串联三个组件阶段，检查跨组件操作与状态衔接；每项任务全过才计分。':'Each task links three components to test transitions and state continuity. Every stage must pass for the task to count.',
    '长程任务':'Long journeys','两条相反顺序的 12 阶段工作流，覆盖草稿恢复、嵌入组件、文件往返与不确定提交。':'Two 12-stage workflows in opposite orders, including draft recovery, embedded components, file round trips and uncertain submissions.',
    '分任务类型的通过数量':'Pass counts by task type','单项 / 12':'Singles / 12','组合 / 4':'Combos / 4','长程 / 2':'Journeys / 2','模型输出次数':'Model outputs','浏览器 CLI calls':'Browser CLI calls',
    '打开任务，亲手试试。':'Open a task. Try it yourself.','同一份任务定义 · 同一套组件 UI':'Shared task definitions · Shared component UI','选择任务查看原始指令、阶段顺序和交互预览。预览不计分；正式评测仍在带后端的本地环境中运行。':'Select a task to explore its instructions, stage order and interactive preview. Previews are unscored; formal trials run locally with the backend.',
    '任务类型':'Task category','全部 22':'All 22','单项 12':'Singles 12','组合 4':'Combos 4','长程 2':'Journeys 2','验证 4':'Verification 4','搜索任务':'Search tasks','例如 iframe、files、dates':'e.g. iframe, files, dates','任务列表':'Task list','正在加载任务…':'Loading tasks…','任务阶段':'Task stages','完整任务 ↗':'Full task ↗','任务介绍直链 ↗':'Task permalink ↗','原组件交互预览':'Original component preview','任务交互预览':'Interactive task preview',
    '分数应该可以解释。':'Scores should be explainable.','Score v1 · 试验性':'Score v1 · Experimental','完成质量 Q':'Task quality Q','100 ×（单项通过率 × 40% + 组合通过率 × 30% + 长程通过率 × 30%）。阶段部分完成不等于任务通过。':'100 × (single pass rate × 40% + combo pass rate × 30% + journey pass rate × 30%). Partial stage completion is not a task pass.',
    'Token 性价比 V':'Token value V','先以相对权重计算消耗 C，再计算 Q ÷ C。同一数据集中表现最高者归一化为 100，其他工具按比例计分。':'Compute weighted consumption C, then Q ÷ C. Normalize the best tool in this dataset to 100 and score the others proportionally.',
    '综合分 S':'Composite S','Q × 质量权重 + V ×（1 − 质量权重）。默认 80% / 20%；权重是编辑选择，而非客观真值。':'Q × quality weight + V × (1 − quality weight). Defaults: 80% / 20%. These are editorial choices, not objective truths.',
    '读榜之前，请保留这些条件。':'Keep these conditions in mind.','只有一次重复。':'Only one repetition.','这是探索性样本，不是稳定排行榜，也没有足够数据给出置信区间。':'This is exploratory evidence, not a stable leaderboard; there is insufficient data for confidence intervals.',
    '提前失败可能更省 Token。':'Early failures can use fewer tokens.','性价比不能脱离通过率解读；低消耗本身不意味着更好。':'Interpret efficiency alongside pass rates. Lower consumption alone is not better.',
    '工具栈并不完全相同。':'Tool stacks differ.','bsk CLI 0.5.0 / 扩展 0.4.2 存在协议差异；Kitesurf 使用自定义 CDP 适配器，浏览器版本和视口也不同。':'bsk CLI 0.5.0 / extension 0.4.2 have a protocol mismatch. Kitesurf uses a custom CDP adapter; browser versions and viewports also differ.',
    '耗时不进入综合分。':'Timing is excluded from the score.','测试包含串行和最多 6 个任务的并行条件，存在资源竞争，无法据此做公平速度排名。':'Trials mix serial and up-to-six-way parallel conditions with resource contention, preventing a fair speed ranking.',
    'Turnstile 是官方测试密钥。':'Turnstile uses official test keys.','通过测试模式不代表绕过真实验证码。':'Passing test modes does not demonstrate real CAPTCHA bypass.',
    '54 条额度中断记录单独保存。':'54 quota-interrupted executions are retained separately.','不计入评分，实际计费还需考虑这些执行的消耗。本页仅展示汇总，原始日志与逐次结果不公开。':'They are excluded from scores but contribute to actual usage. This page presents aggregates only; raw logs and per-attempt results are not public.',
    '本地合成站点 · 独立状态判分 · Provider Token 计量':'Local synthetic sites · Independent state grading · Provider token counters',
    '请启用 JavaScript 查看交互榜单。默认综合分：ego browser 88.0，BrowserSkill 53.5，Kitesurf 42.1。':'Enable JavaScript to use the leaderboard. Default composite scores: ego browser 88.0, BrowserSkill 53.5, Kitesurf 42.1.',
    '交互预览 · 复用评测 UI，状态仅保存在本机。非正式评测、不生成成绩。嵌入框架在此同源运行，跨域边界需本地双端口环境。':'Interactive preview · Shared evaluation UI; state stays on this device. Unscored. Frames here are same-origin; cross-origin boundaries require the local dual-port environment.',
    '重置本任务':'Reset this task'
  };
  const originals = new WeakMap(), attributes = new WeakMap();
  let lang;
  try { lang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('bab-language') || 'zh'; } catch { lang = 'zh'; }
  lang = lang === 'en' ? 'en' : 'zh';
  const api = window.I18N = {get lang(){return lang},pick:(zh,en)=>lang==='en'?en:zh, text:zh=>lang==='en'?(en[zh]||zh):zh};
  function translate() {
    document.documentElement.lang=lang==='en'?'en':'zh-CN';
    const walker=document.createTreeWalker(document,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {const n=walker.currentNode;if(n.parentElement?.closest('script,style,textarea,[contenteditable]'))continue;const original=originals.get(n)??n.textContent;originals.set(n,original);const trimmed=original.trim();if(en[trimmed])n.textContent=original.replace(trimmed,lang==='en'?en[trimmed]:trimmed);}
    for(const element of document.querySelectorAll('[aria-label],[placeholder],[title],meta[name="description"]'))for(const key of ['aria-label','placeholder','title','content']){const value=element.getAttribute(key);if(value===null)continue;let values=attributes.get(element);if(!values)attributes.set(element,values={});const original=values[key]??value;values[key]=original;if(en[original])element.setAttribute(key,lang==='en'?en[original]:original);}
    for(const select of document.querySelectorAll('[data-language]'))select.value=lang;
  }
  api.setLanguage = (value) => {
    lang=value==='en'?'en':'zh';try{localStorage.setItem('bab-language',lang);}catch{}
    const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);
    translate();window.dispatchEvent(new Event('languagechange'));
    for(const frame of document.querySelectorAll('iframe'))frame.contentWindow?.postMessage({type:'bab-language',language:lang},location.origin);
  };
  api.translate=translate;
  document.addEventListener('DOMContentLoaded',()=>{translate();for(const select of document.querySelectorAll('[data-language]'))select.addEventListener('change',()=>api.setLanguage(select.value));});
  window.addEventListener('message',e=>{if(e.source===parent&&e.origin===location.origin&&e.data?.type==='bab-language')api.setLanguage(e.data.language);});
})();
