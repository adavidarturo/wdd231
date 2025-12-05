// form-response.mjs
// This module reads the form submission values from the URL query string
// using `URLSearchParams`. The browser encodes form fields into the query
// string when the form uses GET; here we iterate the entries and render
// them back to the page. This demonstrates using an iterator over the
// SearchParams and simple DOM creation.
document.addEventListener('DOMContentLoaded', ()=>{
  const params = new URLSearchParams(window.location.search);
  const container = document.createElement('main');
  container.className = 'container';
  const title = document.createElement('h2');
  title.textContent = 'Form Submission';
  container.appendChild(title);
  const list = document.createElement('ul');
  for (const [k,v] of params.entries()){
    const li = document.createElement('li');
    li.innerHTML = `<strong>${k}:</strong> ${v}`;
    list.appendChild(li);
  }
  container.appendChild(list);
  document.body.prepend(container);
});
