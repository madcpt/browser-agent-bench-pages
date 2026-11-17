(async () => {
  const list = document.getElementById('task-list');
  const search = document.getElementById('task-search');
  const escape = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let filter = 'all', selected, stage = 0, tasks;
  const category = t => t.suite === 'guard' ? 'guard' : t.tier;
  const kinds = {short:'单项',medium:'组合',long:'长程',guard:'官方验证测试'};
  const urlFor = id => 'demo/lab.html?' + new URLSearchParams({task:id});
  const taskFromHash = () => location.hash.startsWith('#task=') ? new URLSearchParams(location.hash.slice(1)).get('task') : null;
  function renderList() {
    const query = search.value.toLowerCase().trim();
    const visible = tasks.filter(t=>(filter==='all'||category(t)===filter)&&(!query||[t.id,t.title,...t.modules.map(m=>m.brief)].join(' ').toLowerCase().includes(query)));
    list.innerHTML = visible.map(t=>`<button type="button" data-task="${escape(t.id)}" aria-pressed="${t.id===selected?.id}"><span>${escape(t.title.length>56?t.title.slice(0,53)+'…':t.title)}</span><small>${escape(t.id)} · ${t.modules.length} 阶段</small></button>`).join('');
    document.getElementById('task-count').textContent = `${visible.length} 个任务${visible.length?'':' · 尝试其他关键词'}`;
    for(const b of list.querySelectorAll('[data-task]'))b.addEventListener('click',()=>select(b.dataset.task,true));
  }
  function renderStage() {
    const m = selected.modules[stage];
    document.getElementById('stage-brief').textContent=m.brief;
    for(const b of document.querySelectorAll('[data-stage]'))b.setAttribute('aria-pressed',String(Number(b.dataset.stage)===stage));
    const single = tasks.find(t=>t.modules.length===1&&t.modules[0].type===m.type);
    const frame=document.getElementById('task-preview');frame.src=urlFor(single?.id||selected.id);frame.title=m.title+' · 原任务组件预览';
    document.getElementById('preview-caption').textContent=`阶段 ${stage+1}/${selected.modules.length} · ${m.title} · 下方复用原组件。完整任务链接保留原阶段顺序。`;
  }
  function select(id, updateHash=false) {
    selected=tasks.find(t=>t.id===id);if(!selected)return;
    stage=0;
    document.getElementById('task-title').textContent=selected.title;
    document.getElementById('task-meta').textContent=`${selected.id} · ${kinds[category(selected)]} · v${selected.version} · 原评测限时 ${selected.timeout_seconds/60} 分钟`;
    document.getElementById('task-stages').innerHTML=selected.modules.map((m,i)=>`<button type="button" data-stage="${i}" aria-pressed="${i===0}">${i+1}. ${escape(m.title)}</button>`).join('');
    for(const b of document.querySelectorAll('[data-stage]'))b.addEventListener('click',()=>{stage=Number(b.dataset.stage);renderStage()});
    document.getElementById('task-open').href=urlFor(id);
    document.getElementById('task-permalink').href='#task='+encodeURIComponent(id);
    if(updateHash)history.replaceState(null,'','#task='+encodeURIComponent(id));
    renderList();renderStage();
  }
  try {
    const r=await fetch('task-catalog.json');if(!r.ok)throw Error('任务目录未加载，请稍后刷新。');
    ({tasks}=await r.json());
    for(const b of document.querySelectorAll('[data-task-filter]'))b.addEventListener('click',()=>{filter=b.dataset.taskFilter;for(const other of document.querySelectorAll('[data-task-filter]'))other.setAttribute('aria-pressed',String(other===b));renderList()});
    search.addEventListener('input',renderList);
    window.addEventListener('hashchange',()=>{const id=taskFromHash();if(id)select(id)});
    select(taskFromHash()||tasks[0].id);
    if(taskFromHash())document.getElementById('tasks').scrollIntoView({behavior:'instant'});
  } catch(e){document.getElementById('task-error').textContent=e.message;}
})();
