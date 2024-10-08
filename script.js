
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    document.querySelector('#navbarNav').classList.toggle('show');
  });
  

// Mostrar la página de cocina al hacer clic en el banner
document.getElementById('quien-cocina-banner').addEventListener('click', function() {
    window.location.href = 'cocina.html';
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


function loadRegistros() {
    google.script.run.withSuccessHandler(function(data) {
        var tableBody = document.getElementById('registroTableBody');
        tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
        
        data.forEach(function(row) {
            var newRow = document.createElement('tr');
            
            // Agregar cada dato como una celda de la tabla
            row.forEach(function(cell) {
                var cellElement = document.createElement('td');
                cellElement.textContent = cell;
                newRow.appendChild(cellElement);
            });

            tableBody.appendChild(newRow);
        });
    }).getRegistros();  // Función del lado del servidor que obtiene los registros
}
function getRegistros() {
    var sheet = SpreadsheetApp.openById('1ZDvkYuITxKN3oA120uIEwNEzDuEqk7Z6mXiEBqbgxq8').getSheetByName('FORM');
    var data = sheet.getDataRange().getValues(); // Obtén todos los datos de la hoja
  
    // Devuelve los datos al frontend
    return data.slice(1); // Omitir la primera fila (encabezados)
  }
  
window.onload = function() {
    loadRegistros();
};




