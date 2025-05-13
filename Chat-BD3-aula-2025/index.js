const express = require('express');

const http = require('http');

const SocketIO = require('socket.io') ;

const app = express();

const server = http.createServer(app);
const io = SocketIO(server);

const ejs = require('ejs');

const path = require('path');
const { Socket } = require('dgram');

app.use(express.static(path.join(__dirname, 'public')));
// console.log(path.join(__dirname, 'public'));


app.set('view',path.join(__dirname, 'public'));

app.engine('html',ejs.renderFile);

app.use('/', (req,res)=>{
    res.render('index.html');
})

/*##### LOGICA DO SOCKET.IO - ENVIO E PROPRAGAÇÃO DE MENSAGEM #####*/

    let messages =[];

/*##### ESTRUTURA DE CONEXÃO DO SOCKET.IO  #####*/

io.on('connection', socket=>{

        //Teste de conexão:

    console.log('NOVO USUÁRIO CONECTADO:' + socket.id)
    // recupera e mantem (exibe) as mensagens entre o fron e o back:
    socket.emit('previousMessage',messages);

        // Logica de chat quando uma mensagem é enviada:
        socket.on('sendMessage', data =>{

      //Adiciona a mensagem no final do array da mensagens:
      messages.push(data);
      socket.broadcast.emit('receiveMessage',data);

        });

})

server.listen(3000, () => {
    console.log('CHAT RODANDO EM - http://localhost:3000')
});