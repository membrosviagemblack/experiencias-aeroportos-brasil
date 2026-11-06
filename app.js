let DATA;
const $=id=>document.getElementById(id);
const norm=s=>(s||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
fetch("dados/aeroportos.json").then(r=>r.json()).then(d=>{DATA=d;$("airportCount").textContent=d.airports.length;$("experienceCount").textContent=d.experiences.length;render()}).catch(()=>{$("cards").innerHTML="<p>Não foi possível carregar os dados. Verifique se a pasta dados foi publicada junto com o site.</p>"});
["search","category","program"].forEach(id=>$(id).addEventListener(id==="search"?"input":"change",render));
$("clear").addEventListener("click",()=>{$("search").value="";$("category").value="";$("program").value="";render()});
function accessLabel(v){return /sim/i.test(v||"")?"Disponível":(/não|nao/i.test(v||"")?"Não listado":(v||"A confirmar"))}
function render(){
 if(!DATA)return;
 const q=norm($("search").value),cat=$("category").value,prog=$("program").value;
 const list=DATA.experiences.filter(x=>{
  const hay=norm([x.name,x.airportCity,x.airportCode,x.location,x.rules,x.tips,x.vac,x.priorityPass,x.loungeKey].join(" "));
  return (!q||hay.includes(q))&&(!cat||x.category===cat)&&(!prog||/sim/i.test(x[prog]||""));
 });
 $("resultCount").textContent=list.length+" resultado(s)";
 $("empty").hidden=list.length>0;
 $("cards").innerHTML=list.map(x=>{
  const programs=[["VAC",x.vac],["Priority Pass",x.priorityPass],["LoungeKey",x.loungeKey]];
  const pending=[!x.hours||/confirm|não informado/i.test(x.hours),!x.location||/confirm|não informado/i.test(x.location)].some(Boolean);
  return `<article class="card"><div class="card-top"><div><div class="city">${esc(x.airportCity)} · ${esc(x.airportCode)}</div><h3>${esc(x.name)}</h3></div><span class="tag">${esc(x.category)}</span></div>
  <div class="detail"><b>Horário</b><span>${esc(x.hours||"A confirmar")}</span></div>
  <div class="detail"><b>Localização</b><span>${esc(x.location||"A confirmar")}</span></div>
  ${x.rules?`<div class="detail"><b>Regras</b><span>${esc(x.rules)}</span></div>`:""}
  <div class="programs">${programs.map(([n,v])=>`<span class="program ${/sim/i.test(v||"")?"yes":""}">${n}: ${esc(accessLabel(v))}</span>`).join("")}</div>
  ${x.tips?`<div class="tip"><strong>DICA</strong>${esc(x.tips)}</div>`:""}
  ${pending?`<div class="pending">Algumas informações desta experiência precisam de confirmação.</div>`:""}</article>`;
 }).join("");
}
function esc(s){return (s||"").toString().replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
