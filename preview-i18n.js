(async () => {
  const [catalog, translations]=await Promise.all([
    fetch('../task-catalog.json').then(r=>r.json()),fetch('../task-translations.zh.json').then(r=>r.json())
  ]);
  const task=new URLSearchParams(location.search).get('task')||'cap-01-basic';
  const spec=catalog.tasks.find(t=>t.id===task);
  const notice=document.getElementById('preview-language-note');
  function render(){
    if(notice)notice.textContent=I18N.pick('控件与目标值保留原始英文；任务说明可切换中英文。','Controls and target values retain their original wording; task instructions are bilingual.');
    const h=document.querySelector('#lab-root h1');
    const stage=Number(h?.textContent.match(/Stage (\d+)/)?.[1]||1)-1;
    const module=spec?.modules[stage],p=document.querySelector('.brief p');
    if(p&&module){const text=I18N.lang==='zh'?(translations[module.type]?.brief||module.brief):module.brief;if(p.textContent!==text)p.textContent=text;}
    const guard=document.querySelector('#lab-root [role="status"]');
    if(guard&&spec?.suite==='guard'){
      const text=I18N.pick('本任务需要本地后端与官方 Siteverify。Pages 仅展示说明，不加载验证服务，也不生成通过结果。','This task requires the local backend and official Siteverify. Pages displays instructions only, without verification or a passing result.');
      if(guard.textContent!==text)guard.textContent=text;
    }
  }
  window.addEventListener('languagechange',render);
  new MutationObserver(render).observe(document.getElementById('lab-root'),{childList:true,subtree:true});render();
})();
