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

//Creamos un array de mensajes, donde se van sumando los mensajes del chat
var mensajes = [{
	id: 1,
	texto: 'Bienvenido a nuestro chat NodeJS y Socket.io...' ,
	nickname: 'Bot - midesarrollo.SADO'
}];

//Abrimos las conexiones
io.on('connection', function(socket){
	console.log("Aceptada una nueva conexion con la IP: " + socket.handshake.address);

	//Emito los mensajes a todos los clientes
	socket.emit('mensajes', mensajes);

	socket.on('add-mensaje', function(data){
		mensajes.push(data); //Añado los mensajes recibidos a mi array

		io.sockets.emit('mensajes', mensajes); // Mano todos los mensajes a todos los clientes
	})
});

// Ponemos al servidor a la escucha en el puerto indicado.
server.listen(6677, function(){
	console.log('Servidor esta funcionando en http://localhost:6677');});
