// Last Modification (footer)

function formatLastModified(raw){
  if (!raw) return '--';
  const d = new Date(raw);
  if (isNaN(d)) return raw;
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('lastModified');
  const raw = document.lastModified;
  el.textContent = formatLastModified(raw);
});
