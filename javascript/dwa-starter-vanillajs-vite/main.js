// main.js

import { Home, About, Settings, NotFound } from './components.js';

// Define routes and their corresponding components
const routes = {
    '/': Home,
    '/about': About,
    '/settings': Settings,
};

// Function to handle navigation
function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

// Router function to render components based on the current URL
function router() {
    const path = window.location.pathname;
    const route = routes[path] || NotFound;
    route();
}

// Function to toggle dark/light mode
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Event delegation for link clicks and theme toggle
document.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
        e.preventDefault();
        navigateTo(e.target.href);
    } else if (e.target.matches('#theme-toggle')) {
        e.preventDefault();
        toggleTheme();
    }
});

// Listen to popstate event (back/forward navigation)
window.addEventListener('popstate', router);

// Initial call to router to render the correct component on page load
document.addEventListener('DOMContentLoaded', router);

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
    document.documentElement.setAttribute('data-theme', savedTheme);
    router(); // Call router after setting the theme
});
