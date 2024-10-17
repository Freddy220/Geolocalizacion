
const search_form = document.querySelector(".header_form");

search_form.addEventListener("submit", (event) => {
    /* evitar que el formulario se envíe automáticamente al hacer clic */
    event.preventDefault();

    /* obtener el valor del campo del formulario */
    const value = document.querySelector("#search").value;

    /* Pasar la dirección IP a la función search_Ip_Address() */
    search_Ip_Address(value);
});

/* Buscar una dirección IP */
async function search_Ip_Address(ip_address) {
    try {
        console.log("Realizando solicitud al backend...");

        // Aquí cambias la URL para que apunte al backend en lugar de directamente a la API externa
        const request = await fetch(`http://localhost:3000/api/location/${ip_address}`);
        
        console.log("Estado de la solicitud:", request.status);

        if (!request.ok) throw new Error("Error al obtener los datos de la dirección IP");

        const response = await request.json();
        console.log("Respuesta recibida del backend:", response);

        const { location, ip, isp } = response;

        /* Actualizar la IU en la página */
        update_ui(ip, location.city, location.timezone, isp);

        /* Actualizar el mapa en la página */
        if (map !== undefined && map !== null) {
            map.remove();
        }
        create_map(location.lat, location.lng, location.country, location.region);

    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Error al obtener la dirección IP desde el backend");
    }
}


/* Crear el mapa */
let map;
function create_map(lat, lng, country, region) {
    map = L.map('map').setView([lat, lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    /* Agregar marcador al mapa utilizando el marcador predeterminado de Leaflet */
    const marker = L.marker([lat, lng]).addTo(map)
        .bindPopup(`${region}, ${country}`)
        .openPopup();
}

/* Actualizar función UI */
function update_ui(ip_address, city, timezone, isp) {
    /* seleccionar todos los elementos en la página */
    const address = document.querySelector(".address");
    const location = document.querySelector(".location");
    const utc = document.querySelector(".utc");
    const isprovider = document.querySelector(".isp");

    /* Actualizar todos los elementos de la página */
    address.textContent = ip_address;
    location.textContent = city;
    utc.textContent = 'UTC' + timezone;
    isprovider.textContent = isp;
}

/* Crear mapa con valores predeterminados cuando se carga la página */
const defaultIp = "26.37.52.179";
search_Ip_Address(defaultIp);


fetch('http://localhost:3000/api/location/8.8.8.8')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Muestra la respuesta en la consola
    // Aquí puedes pasar los datos al mapa
  })
  .catch(error => console.error('Error:', error));









