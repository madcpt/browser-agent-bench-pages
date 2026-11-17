// Presentation-only persistence adapter. This never produces an evaluation grade.
export async function demoApi(task, path, body = {}) {
  const catalog = await (await fetch('../task-catalog.json')).json();
  const spec = catalog.tasks.find(t => t.id === task);
  if (!spec) throw Error('Unknown task');
  const key = 'bab-preview-v1:' + task;
  const state = JSON.parse(localStorage.getItem(key) || 'null') || {records:[],drafts:{},draftSaved:[],faults:0,reconciliations:0,downloads:0,verification:[]};
  const persist = () => localStorage.setItem(key, JSON.stringify(state));
  if (!path) return {task, modules:spec.modules, progress:state};
  if (path === '/draft') {state.drafts[body.stage]=body.data;state.draftSaved.push(body.stage);persist();return {saved:true};}
  if (path === '/reconcile') {state.reconciliations++;persist();return state;}
  if (path === '/download') {state.downloads++;persist();return {csv:'id,quantity\nITEM-101,7\nITEM-220,4\n'};}
  if (path === '/verify' || spec.suite === 'guard') throw Error('此预览不提供 Turnstile 服务端验证。请在本地评测站运行该任务。');
  if (path === '/stage') {
    if(state.records.some(r=>r.requestId===body.requestId))return {saved:true,duplicate:true};
    if(body.stage!==state.records.length)throw Error('Stage changed. Check saved state.');
    const module=spec.modules[body.stage]?.type;
    if(module==='recovery'&&!state.faults){state.faults++;persist();throw Error('Preview simulation: save failed before committing. Retry once.');}
    state.records.push({id:crypto.randomUUID(),stage:body.stage,module,data:body.data,requestId:body.requestId});
    delete state.drafts[body.stage];persist();
    if(module==='recovery')throw Error('Preview simulation: connection lost after save. Use Check saved state.');
    return {saved:true};
  }
  throw Error('Unsupported preview operation');
}
