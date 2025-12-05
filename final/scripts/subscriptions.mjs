
document.addEventListener('DOMContentLoaded', ()=>{
  const hash = location.hash;
  if(hash){
    const el = document.querySelector(hash);
    if(el) el.scrollIntoView({behavior:'smooth', block:'center'});
  }
});
