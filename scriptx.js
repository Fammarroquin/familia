



document.addEventListener('DOMContentLoaded', function() {
    // Detectar el cambio de opción de parentesco
    document.querySelectorAll('input[name="parentesco"]').forEach((elem) => {
        elem.addEventListener('change', function() {
            const parentesco = this.value;

            const padreContainer = document.getElementById('padreContainer');
            const padreLabel = document.getElementById('padreLabel'); // La etiqueta que queremos cambiar
            const padreSelect = document.getElementById('padre');
            
            padreSelect.innerHTML = ''; // Limpiar las opciones anteriores
            
            if (parentesco === 'hijo') {
                padreContainer.style.display = 'none'; // No mostrar lista de padres
            } else if (parentesco === 'nuerayerno') {
                padreContainer.style.display = 'block'; // Mostrar lista de padres
                padreLabel.innerHTML = '<i class="fas fa-user-tie"></i> Tu esposo(a) es:'; // Cambiar el texto de la etiqueta
                padreSelect.innerHTML = '<option value="">Selecciona un esposo(a)</option>'; // Cambiar texto del option por defecto
                fetchParentescoData('nuerayerno'); // Filtrar y cargar hijos y nietos
            } else {
                padreContainer.style.display = 'block'; // Mostrar lista de padres para nietos o bisnietos
                padreLabel.innerHTML = '<i class="fas fa-child"></i> Tu Papá/Mamá es:'; // Restaurar el texto original de la etiqueta
                padreSelect.innerHTML = '<option value="">Selecciona </option>'; // Restaurar el texto del option por defecto
                fetchParentescoData(parentesco); // Filtrar según el parentesco seleccionado
            }
        });
    });
});



// Función para obtener datos filtrados desde Google Apps Script
function fetchParentescoData(parentesco) {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxXjUvof0uqffLfrGK4-y8sbRo1AleGzi5U8V0itKXaxtiQXGx5XgsfeWzcgUdpAkGF/exec';

    fetch(`${scriptUrl}?parentesco=${parentesco}`)
        .then(response => response.json())
        .then(data => {
            populatePadreSelect(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Llenar el select de padres con los datos obtenidos
function populatePadreSelect(data) {
    const padreSelect = document.getElementById('padre');
    padreSelect.innerHTML = '<option value="">Selecciona </option>'; // Placeholder

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.nombres;
        option.text = `${item.nombres} (${item.apodo})`; // Mostrar nombre + apodo
        padreSelect.add(option);
    });
}


document.getElementById('fecha_cumple').addEventListener('change', function () {
    const cumpleanos = new Date(this.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const mes = hoy.getMonth() - cumpleanos.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    document.getElementById('edad').value = edad;
});

document.getElementById("registro-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxXjUvof0uqffLfrGK4-y8sbRo1AleGzi5U8V0itKXaxtiQXGx5XgsfeWzcgUdpAkGF/exec';
    const formData = new FormData(document.getElementById("registro-form"));

    // Capturar el valor del campo "padre" siempre
    const padreSeleccionado = document.getElementById('padre').value || 'N/A'; // Si no hay valor, enviamos 'N/A'
    formData.append('padre', padreSeleccionado); // Agregar el campo "padre" al FormData

    // Capturar el valor del campo "celular"
    const celular = document.getElementById('celular').value || 'N/A'; // Si no hay celular, enviar 'N/A'
    formData.append('celular', celular); // Agregar el campo "celular" al FormData

    // Enviar el formulario a Google Apps Script
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            const banner = document.getElementById("mensaje-banner");
            const textoBanner = document.getElementById("mensaje-banner-texto");
            const sonidoExito = document.getElementById("sonido-exito");

            textoBanner.textContent = `✅ ¡LISTO! ENVIADO ${data.apodo} 😎`;  // Personaliza el mensaje con el apodo
            banner.style.display = "flex";  // Muestra el banner
            sonidoExito.play();  // Reproduce el sonido de éxito
        })
        .catch(error => {
            console.error('Error al intentar enviar los datos:', error);
            alert("Hubo un error al enviar el formulario.");
        });
});

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('registrados-lista')) {
        console.log("Intentando cargar registros...");
        fetchRegistrados();
    }
});

function fetchRegistrados() {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxXjUvof0uqffLfrGK4-y8sbRo1AleGzi5U8V0itKXaxtiQXGx5XgsfeWzcgUdpAkGF/exec';
    
    fetch(`${scriptUrl}?action=getRegistrados`)
        .then(response => {
            console.log("Respuesta recibida:", response);
            return response.json();
        })
        .then(data => {
            console.log("Datos obtenidos:", data);
            populateRegistrados(data);
        })
        .catch(error => {
            console.error('Error al obtener los registros:', error);
            alert('Hubo un error al cargar los registros.');
        });
}

function populateRegistrados(data) {
    const lista = document.getElementById('registrados-lista');
    lista.innerHTML = ''; // Limpiar la tabla

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nombres}</td>
            <td>${item.fecha_cumple}</td>
            <td>${item.edad}</td>
            <td>${item.apodo}</td>
            <td>${item.email}</td>
            <td>${item.parentesco}</td>
            <td>${item.celular}</td>
        `;
        lista.appendChild(row);
    });
}


document.getElementById("cerrar-banner").addEventListener("click", function () {
    document.getElementById("mensaje-banner").style.display = "none";
    document.getElementById("registro-form").reset();
});
