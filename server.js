// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'at_oZe7CwzW9uAXZOn0biOOXyxdbfrYg'; // Reemplaza esto con tu clave API

// clave guardada en el archivo .env


// Middleware
app.use(cors()); // Habilita CORS
app.use(express.json());

// Endpoint para obtener geolocalización por dirección IP
app.get('/api/location/:ipAddress', async (req, res) => {
    const ipAddress = req.params.ipAddress;

    try {
        const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipAddress}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la información de la dirección IP' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
