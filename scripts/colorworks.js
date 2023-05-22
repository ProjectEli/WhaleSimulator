let toggleColorMode = document.getElementById('toggleColorMode');

toggleColorMode.addEventListener("click", () => {
    currentColorMode = document.documentElement.getAttribute('data-bs-theme');
    document.documentElement.setAttribute('data-bs-theme',currentColorMode == 'light' ? 'dark': 'light');
})