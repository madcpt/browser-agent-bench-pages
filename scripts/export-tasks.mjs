import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=resolve(process.argv[2]||'../browser-agent-bench');
const {build}=await import(pathToFileURL(resolve(source,'node_modules/esbuild/lib/main.js')));
const {briefs,titles,coreModules,labTask}=await import(pathToFileURL(resolve(source,'shared/lab-catalog.js')));
const definitions=coreModules.map((m,i)=>labTask(`cap-${String(i+1).padStart(2,'0')}-${m}`,[m]));
// Read existing manifests, rather than duplicating their composition or instructions.
const ids=[...definitions.map(t=>t.id),...Array.from({length:4},(_,i)=>`combo-${i+1}`),'journey-1','journey-2',...['pass','fail','expired','interactive'].map(m=>'guard-turnstile-'+m)];
const tasks=ids.map(id=>{const t=JSON.parse(readFileSync(resolve(source,'tasks',id+'.json')));return {id:t.id,version:t.version,suite:t.suite,tier:t.tier,timeout_seconds:t.timeout_seconds,title:t.modules.map(m=>titles[m]||m).join(' → '),modules:t.modules.map(m=>({type:m,title:titles[m]||m,brief:briefs[m]}))};});
writeFileSync(resolve(root,'task-catalog.json'),JSON.stringify({sourceCommit:execFileSync('git',['rev-parse','HEAD'],{cwd:source,encoding:'utf8'}).trim(),tasks},null,2)+'\n');
mkdirSync(resolve(root,'demo/assets'),{recursive:true});
const exact=(text,from,to)=>{if(!text.includes(from))throw Error('Source changed: '+from.slice(0,80));return text.replaceAll(from,to);};
await build({entryPoints:{lab:resolve(source,'src/lab/main.jsx'),embedded:resolve(source,'src/lab/embedded.js')},bundle:true,minify:true,format:'esm',target:'es2022',outdir:resolve(root,'demo/assets'),jsx:'transform',plugins:[{name:'static-preview-only',setup(b){b.onLoad({filter:/src\/lab\/(main\.jsx|embedded\.js)$/},args=>{
 let text=readFileSync(args.path,'utf8');
 if(args.path.endsWith('main.jsx')){
  const start=text.indexOf('async function api('),end=text.indexOf('\nconst initial =',start);if(start<0||end<0)throw Error('API boundary changed');
  text=text.slice(0,start)+`async function api(path, body) { return demoApi(task, path, body); }\n`+text.slice(end);
  text=`import {demoApi} from ${JSON.stringify(resolve(root,'scripts/demo-api.js'))};\n`+text;
  const ts=text.indexOf('function Turnstile('),te=text.indexOf('\nconst components =',ts);if(ts<0||te<0)throw Error('Turnstile boundary changed');
  text=text.slice(0,ts)+`function Turnstile({mode}) { return <p role="status">{mode}: 本任务需要本地后端与官方 Siteverify。Pages 只展示原任务说明，不加载验证服务，也不生成通过结果。</p>; }\n`+text.slice(te);
  text=exact(text,'`http://127.0.0.1:${Number(location.port || 4173) + 2}`','location.origin');
  text=exact(text,'http://127.0.0.1:${Number(location.port || 4173) + 2}/embedded.html','./embedded.html');
  text=exact(text,'/embedded.html?','./embedded.html?').replaceAll('..\/embedded','./embedded');
  text=exact(text,'href={`/?run=${run}`}','href="../#tasks"');
  text=text.replace('Draft restored from server','Draft restored from local preview').replace('Independent grading runs after your\n              browser session ends.','Preview only; no benchmark grade is produced.');
 }else{text=exact(text,"'/embedded.html?'","'./embedded.html?'");}
 return {contents:text,loader:args.path.endsWith('.jsx')?'jsx':'js',resolveDir:dirname(args.path)};
});}}]});
const banner='<aside class="preview-notice">交互预览 · 复用评测 UI，状态仅保存在本机。非正式评测、不生成成绩。嵌入框架在此同源运行，跨域边界需本地双端口环境。 <button id="preview-reset">重置本任务</button> <select data-language aria-label="Language / 语言"><option value="zh">中文</option><option value="en">English</option></select><p id="preview-language-note"></p></aside>';
writeFileSync(resolve(root,'demo/lab.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Task preview · Browser Agent Bench</title><script src="../i18n.js?v=20261118-1"></script><script src="../preview-i18n.js?v=20261118-1" defer></script><link rel="stylesheet" href="assets/lab.css"><style>.preview-notice{padding:12px 20px;background:#fff0ce;font:13px/1.6 system-ui;color:#413616}header{flex-wrap:wrap}header small{margin-left:0}iframe{max-width:100%}.is-embedded-preview header,.is-embedded-preview .brief,.is-embedded-preview main>nav,.is-embedded-preview main>h1{display:none}.is-embedded-preview main{margin:8px auto;padding:12px 16px 48px}</style><script>if(window.self!==window.top)document.documentElement.classList.add("is-embedded-preview");</script>${banner}<div id="lab-root"></div><script type="module" src="assets/lab.js"></script><script>document.getElementById('preview-reset').onclick=()=>{localStorage.removeItem('bab-preview-v1:'+new URLSearchParams(location.search).get('task'));location.reload()};</script></html>`);
writeFileSync(resolve(root,'demo/embedded.html'),'<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Embedded task component</title><main id="embed"></main><script type="module" src="assets/embedded.js"></script></html>');
console.log(`Exported ${tasks.length} original task definitions and shared UI bundles.`);
