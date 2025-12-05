// join.mjs
// This script demonstrates reading URL query parameters with
// `URLSearchParams` to prefill the join form (e.g. `join.html?plan=gold`).
// The script runs on DOMContentLoaded and updates the select's value.
document.addEventListener('DOMContentLoaded', ()=>{
  const params = new URLSearchParams(location.search);
  const plan = params.get('plan');
  const planSelect = document.getElementById('plan');
  if(plan && planSelect){
    const val = plan.toLowerCase();
    // if option exists, set it
    if ([...planSelect.options].some(o=>o.value===val)) planSelect.value = val;
  }
  // Basic client-side validation focus improvement
  const form = document.getElementById('join-form');
  form?.addEventListener('submit', ()=>{
    // simple UX hook - could add analytics or localStorage here
  });
});
