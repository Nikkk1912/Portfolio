const navMenu = document.querySelectorAll('.nav-sections');
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');


function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem("theme", "light");
    }
}

toggleSwitch.addEventListener('change',switchTheme);

const currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : null;

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
        toggleSwitch.checked = true;
    }
}