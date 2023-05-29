const express = require('express');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configuración de puerto
app.set('port', process.env.PORT || 3000);

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Middleware de conexión a la base de datos
app.use(
  myConnection(mysql, {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'db1'
  }, 'single')
);


app.use(express.urlencoded({ extended: false }));

// Importar rutas
const customerRoutes = require('./routes/customer');

// Rutas
app.use('/', customerRoutes);



// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Creando entrads
var entradas = [
  {
    titulo: "Taxi Drive: La Mejor Opción para tu Viaje",
    contenido: "En el mundo de los servicios de transporte, existe una empresa que destaca por encima de las demás: Taxi Drive. Esta compañía se especializa en brindar una experiencia de confort y satisfacción inigualables a cada pasajero que elige viajar en taxi.\n\n<p>Cuando se trata de trasladarte de un lugar a otro, la comodidad y la tranquilidad son aspectos fundamentales. En Taxi Drive, comprendemos la importancia de estos elementos y nos esforzamos por garantizar que cada viaje sea una experiencia placentera.</p>\n\n<p>Nuestros conductores son profesionales capacitados y comprometidos con tu seguridad y bienestar. Ellos están altamente entrenados para brindarte un servicio amable y respetuoso, asegurando que te sientas cómodo durante todo el trayecto.</p>"
  }
];


// Configuración de CORS
app.use(cors({
  origin: '*'
}));

// Ruta de inicio
app.get('/', (req, res) => {
  res.render('home',{todasEntradas: entradas});
});

app.get('/home', (req, res) => {
  res.render('home',{todasEntradas: entradas});
});
app.get('/users', (req, res) => {
  res.render('users');
});
app.get('/trabajo', (req, res) => {
  res.render('trabajo');
});
app.get('/secion', (req, res) => {
  res.render('iniciarSecion');
});
app.get('/secionTrabajo',(req, res) => {
  res.render('iniciarTrabajador');
});
// Puerto de escucha
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});