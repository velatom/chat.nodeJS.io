var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Usamos el contenido estatico de la carpeta client
app.use(express.static('client'));

// Abrimos una peticion get que nos permite probar nuestro servidor.
app.get('/servidorOK', function(req,res){
	res.status(200).send('Servidor levantado correctamente');
});

//Abrimos las conexiones
io.on('connection', function(socket){
	console.log("Aceptada una nueva conexion con la IP: " + socket.handshake.address);
});

// Ponemos al servidor a la escucha en el puerto indicado.
server.listen(6677, function(){
	console.log('Servidor esta funcionando en http://localhost:6677');});
