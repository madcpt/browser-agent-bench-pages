const DATA = [
  {
    "tool": "ego",
    "buckets": [
      {
        "name": "single",
        "passed": 12,
        "total": 12,
        "weight": 0.4
      },
      {
        "name": "combo",
        "passed": 4,
        "total": 4,
        "weight": 0.3
      },
      {
        "name": "journey",
        "passed": 1,
        "total": 2,
        "weight": 0.3
      }
    ],
    "passed": 17,
    "total": 18,
    "uncached": 660579,
    "cached": 13936512,
    "output": 59380,
    "tokens": 14656471,
    "modelOutputs": 362,
    "agentCalls": 344,
    "cliCalls": 311,
    "guards": 4
  },
  {
    "tool": "bsk",
    "buckets": [
      {
        "name": "single",
        "passed": 10,
        "total": 12,
        "weight": 0.4
      },
      {
        "name": "combo",
        "passed": 3,
        "total": 4,
        "weight": 0.3
      },
      {
        "name": "journey",
        "passed": 0,
        "total": 2,
        "weight": 0.3
      }
    ],
    "passed": 13,
    "total": 18,
    "uncached": 846695,
    "cached": 20901504,
    "output": 89514,
    "tokens": 21837713,
    "modelOutputs": 526,
    "agentCalls": 508,
    "cliCalls": 841,
    "guards": 4
  },
  {
    "tool": "kitesurf",
    "buckets": [
      {
        "name": "single",
        "passed": 9,
        "total": 12,
        "weight": 0.4
      },
      {
        "name": "combo",
        "passed": 1,
        "total": 4,
        "weight": 0.3
      },
      {
        "name": "journey",
        "passed": 0,
        "total": 2,
        "weight": 0.3
      }
    ],
    "passed": 10,
    "total": 18,
    "uncached": 685392,
    "cached": 9984640,
    "output": 51144,
    "tokens": 10721176,
    "modelOutputs": 323,
    "agentCalls": 305,
    "cliCalls": 1144,
    "guards": 1
  }
];

const names = { ego: 'ego browser', bsk: 'BrowserSkill', kitesurf: 'Kitesurf' };
const tr = (zh,en) => window.I18N.pick(zh,en);
const labels = { composite: '综合分', quality: '完成质量', valueIndex: 'Token 性价比指数' };
const captions = { composite: '质量分与 Token 性价比指数的加权平均。', quality: '单项 40% + 组合 30% + 长程 30%。满分 100。', valueIndex: '每 Token 带来的质量分；本组最高者 = 100。不是实际美元成本。' };
const quality = document.getElementById('quality-weight');
const cache = document.getElementById('cache-weight');
const output = document.getElementById('output-weight');
let metric = 'composite';
function compute(q, c, o) {
  if (![q, c, o].every(Number.isFinite) || q < 0 || q > 100 || c < 0 || o < 0 || c > 100 || o > 100) throw Error(tr('请输入 0–100 范围内的有效权重。','Enter valid weights between 0 and 100.'));
  const rows = DATA.map(row => {
    const quality = 100 * row.buckets.reduce((n, b) => n + b.weight * b.passed / b.total, 0);
    const units = row.uncached + row.cached * c + row.output * o;
    return { ...row, quality, efficiency: quality / units };
  });
  const best = Math.max(...rows.map(r => r.efficiency));
  return rows.map(r => ({ ...r, valueIndex: 100 * r.efficiency / best, composite: r.quality * q / 100 + (100 - q) * r.efficiency / best }));
}
function render() {
  try {
    if (!cache.value.trim() || !output.value.trim()) throw Error(tr('请输入有效的相对成本权重。','Enter valid relative token-cost weights.'));
    const rows = compute(Number(quality.value), Number(cache.value), Number(output.value));
    const ordered = [...rows].sort((a, b) => b[metric] - a[metric]);
    document.getElementById('error').textContent = '';
    document.getElementById('quality-label').textContent = quality.value + '%';
    const translatedLabels={composite:tr('综合分','Composite score'),quality:tr('完成质量','Task quality'),valueIndex:tr('Token 性价比指数','Token-value index')};
    const label=translatedLabels[metric];
    document.getElementById('metric-heading').textContent = label;
    document.getElementById('chart-caption').textContent = window.I18N.lang==='zh'?captions[metric]:{composite:'A weighted average of task quality and token value.',quality:'Singles 40% + combinations 30% + journeys 30%. Maximum: 100.',valueIndex:'Quality per token; the best tool in this dataset = 100. Not actual dollar cost.'}[metric];
    document.getElementById('bars').innerHTML = ordered.map(r => `<div class="bar-row"><div class="bar-label">${names[r.tool]}<span>${r.passed} / 18 ${tr('功能通过','passes')}</span></div><div class="bar-track" role="meter" aria-label="${names[r.tool]} ${label}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.min(100,r[metric]).toFixed(2)}"><div class="bar-fill" style="width:${Math.min(100,r[metric])}%"></div></div><div class="bar-value">${r[metric].toFixed(1)}</div></div>`).join('');
    document.getElementById('scores').innerHTML = [...rows].sort((a,b)=>b.composite-a.composite).map(r => `<tr><td>${names[r.tool]}</td><td>${r.passed}<small> / 18</small></td><td>${r.quality.toFixed(1)}</td><td>${r.valueIndex.toFixed(1)}</td><td class="emphasis">${r.composite.toFixed(1)}</td><td>${(r.tokens/1e6).toFixed(2)}</td><td>${r.guards}<small> / 4</small></td></tr>`).join('');
    document.getElementById('coverage').innerHTML = rows.map(r=>`<tr><td>${names[r.tool]}</td>${r.buckets.map(b=>`<td>${b.passed}</td>`).join('')}<td>${r.modelOutputs}</td><td>${r.agentCalls}</td><td>${r.cliCalls}</td></tr>`).join('');
    document.getElementById('ranking').textContent = label + tr('排序：',' ranking: ') + ordered.map(r => names[r.tool] + ' ' + r[metric].toFixed(1)).join(tr('，',', '));
  } catch(e) { document.getElementById('error').textContent = e.message; }
}
for (const control of [quality, cache, output]) control.addEventListener('input', render);
for (const button of document.querySelectorAll('[data-metric]')) button.addEventListener('click', () => {
  metric = button.dataset.metric;
  for (const other of document.querySelectorAll('[data-metric]')) other.setAttribute('aria-pressed', String(other === button));
  render();
});
document.getElementById('reset').addEventListener('click', () => { quality.value = 80; cache.value = 1; output.value = 1; render(); });
render();

window.addEventListener('languagechange',render);
