(async () => {
  const tr=(zh,en)=>window.I18N.pick(zh,en);
  let translations;
  const titleOf=m=>window.I18N.lang==='zh'?(translations?.[m.type]?.title||m.title):m.title;
  const titleTask=t=>t.modules.map(titleOf).join(' → ');
  const briefOf=m=>window.I18N.lang==='zh'?(translations?.[m.type]?.brief||m.brief):m.brief;
  const list = document.getElementById('task-list');
  const search = document.getElementById('task-search');
  const escape = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let filter = 'all', selected, stage = 0, tasks;
  const category = t => t.suite === 'guard' ? 'guard' : t.tier;
  const kinds = {short:'单项',medium:'组合',long:'长程',guard:'官方验证测试'};
  const urlFor = id => 'demo/lab.html?' + new URLSearchParams({task:id,lang:window.I18N.lang});
  const taskFromHash = () => location.hash.startsWith('#task=') ? new URLSearchParams(location.hash.slice(1)).get('task') : null;
  function renderList() {
    const query = search.value.toLowerCase().trim();
    const visible = tasks.filter(t=>(filter==='all'||category(t)===filter)&&(!query||[t.id,t.title,titleTask(t),...t.modules.map(m=>m.brief+' '+briefOf(m))].join(' ').toLowerCase().includes(query)));
    list.innerHTML = visible.map(t=>`<button type="button" data-task="${escape(t.id)}" aria-pressed="${t.id===selected?.id}"><span>${escape(titleTask(t).length>56?titleTask(t).slice(0,53)+'…':titleTask(t))}</span><small>${escape(t.id)} · ${t.modules.length} ${tr('阶段','stages')}</small></button>`).join('');
    document.getElementById('task-count').textContent = `${visible.length} ${tr('个任务','tasks')}${visible.length?'':tr(' · 尝试其他关键词',' · Try another keyword')}`;
    for(const b of list.querySelectorAll('[data-task]'))b.addEventListener('click',()=>select(b.dataset.task,true));
  }
  function renderStage() {
    const m = selected.modules[stage];
    document.getElementById('stage-brief').textContent=briefOf(m);
    for(const b of document.querySelectorAll('[data-stage]'))b.setAttribute('aria-pressed',String(Number(b.dataset.stage)===stage));
    const single = tasks.find(t=>t.modules.length===1&&t.modules[0].type===m.type);
    const frame=document.getElementById('task-preview');const target=urlFor(single?.id||selected.id);if(frame.dataset.task!==(single?.id||selected.id)){frame.src=target;frame.dataset.task=single?.id||selected.id;}else frame.contentWindow?.postMessage({type:'bab-language',language:window.I18N.lang},location.origin);frame.title=titleOf(m)+tr(' · 原任务组件预览',' · Original task component');
    document.getElementById('preview-caption').textContent=tr(`阶段 ${stage+1}/${selected.modules.length} · ${titleOf(m)} · 下方复用原组件。完整任务链接保留原阶段顺序。`,`Stage ${stage+1}/${selected.modules.length} · ${titleOf(m)} · Original component below. Full-task links preserve stage order.`);
  }
  function renderDetail() {
    document.getElementById('task-title').textContent=titleTask(selected);
    document.getElementById('task-meta').textContent=`${selected.id} · ${window.I18N.lang==='zh'?kinds[category(selected)]:{short:'Single',medium:'Combination',long:'Journey',guard:'Official verification test'}[category(selected)]} · v${selected.version} · ${tr('原评测限时','Original timeout')} ${selected.timeout_seconds/60} ${tr('分钟','minutes')}`;
    document.getElementById('task-stages').innerHTML=selected.modules.map((m,i)=>`<button type="button" data-stage="${i}" aria-pressed="${i===0}">${i+1}. ${escape(titleOf(m))}</button>`).join('');
    for(const b of document.querySelectorAll('[data-stage]'))b.addEventListener('click',()=>{stage=Number(b.dataset.stage);renderStage()});
    document.getElementById('task-open').href=urlFor(selected.id);
    document.getElementById('task-permalink').href='#task='+encodeURIComponent(selected.id);
    renderList();renderStage();
  }
  function select(id,updateHash=false){selected=tasks.find(t=>t.id===id)||tasks[0];stage=0;if(updateHash)history.replaceState(null,'','#task='+encodeURIComponent(selected.id));renderDetail();}
  try {
    const r=await fetch('task-catalog.json');if(!r.ok)throw Error(tr('任务目录未加载，请稍后刷新。','Task catalog could not load. Please refresh.'));
    ({tasks}=await r.json());
    translations=await (await fetch('task-translations.zh.json')).json();
    window.addEventListener('languagechange',()=>{if(selected)renderDetail()});
    for(const b of document.querySelectorAll('[data-task-filter]'))b.addEventListener('click',()=>{filter=b.dataset.taskFilter;for(const other of document.querySelectorAll('[data-task-filter]'))other.setAttribute('aria-pressed',String(other===b));renderList()});
    search.addEventListener('input',renderList);
    window.addEventListener('hashchange',()=>{const id=taskFromHash();if(id)select(id)});
    select(taskFromHash()||tasks[0].id);
    if(taskFromHash())document.getElementById('tasks').scrollIntoView({behavior:'instant'});
  } catch(e){document.getElementById('task-error').textContent=e.message;}
})();
