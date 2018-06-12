// Indicamos la url donde esta alofjado el servicio
var socket = io.connect('http://192.168.1.36:6677',{'forceNew':true}); //Forzamos la conexion

socket.on('mensajes', function(data){
	console.log(data);
	render(data);
});

function render(data){
	var html = data.map(function(mensaje, indice){
		return(`
			<div class="mensaje">
				<strong>${mensaje.nickname}</strong> comenta:
				<p>${mensaje.texto}</p>
			</div>
		`);
	}).join(' '); // Con esto añadimos un espacio entre elementos

	var div_mensajes = document.getElementById('mensajes');
	div_mensajes.innerHTML = html;
	div_mensajes.scrollTop = div_mensajes.scrollHeight;
}

function addMensaje(e){
		var txtMensaje = {
			nickname: document.getElementById('nickname').value,
			texto: document.getElementById('texto').value
		};

		document.getElementById('nickname').style.display = 'none';

		socket.emit('add-mensaje', txtMensaje);

		return false;
}