
// Mostrar la página de cocina al hacer clic en el banner
document.getElementById('quien-cocina-banner').addEventListener('click', function() {
    window.location.href = 'cocina.html';
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.navbar-toggler');
    const navMenu = document.querySelector('#navbarNav');

    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('show');
    });

    // Cerrar el menú cuando se haga clic en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('show');
        });
    });

    // Cerrar el menú si se hace clic fuera del menú
    document.addEventListener('click', function (event) {
        if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('show');
        }
    });

    // Asegurarse de que el menú hamburguesa se oculte cuando la ventana cambie de tamaño
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 769) {
            navMenu.classList.remove('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const storyImage = document.querySelector('.story-image');

    storyImage.addEventListener('click', function () {
        if (storyImage.style.position === 'fixed') {
            storyImage.style.position = '';
            storyImage.style.width = '';
            storyImage.style.height = '';
            storyImage.style.top = '';
            storyImage.style.left = '';
        } else {
            storyImage.style.position = 'fixed';
            storyImage.style.top = '0';
            storyImage.style.left = '0';
            storyImage.style.width = '100vw';
            storyImage.style.height = '100vh';
            storyImage.style.objectFit = 'cover';
        }
    });
});
// Funcionalidad para cerrar el banner
document.getElementById('cerrar-banner').addEventListener('click', function() {
    document.getElementById('quien-cocina-banner').style.display = 'none';
});



