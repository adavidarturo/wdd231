// Last modification footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearNode = document.getElementById('current-year');
    if (yearNode) yearNode.textContent = currentYear;

    const lastModifiedDate = document.lastModified;
    const lastNode = document.getElementById('last-modified');
    if (lastNode) lastNode.textContent = `Last Modification: ${lastModifiedDate}`;
});
