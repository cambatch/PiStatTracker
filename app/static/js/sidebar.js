document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    toggleButton.addEventListener('click', function() {
        const sidebarWidth = sidebar.getBoundingClientRect().width;
        sidebar.classList.toggle('show');
        if (sidebar.classList.contains('show')) {
            mainContent.style.marginLeft = sidebarWidth + 'px';
            toggleButton.style.left = sidebarWidth + 'px';
        } else {
            mainContent.style.marginLeft = '0';
            toggleButton.style.left = '10px';
        }
    });
});
