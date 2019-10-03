module.exports = require('./lib/emoji');
var mysql = require('mysql');
var emoji = require('node-emoji')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express')
const app = express()
const port = 3000;

const { randomizePersonal } = require('./routes/resources')
const { loginUser, loginUserPage } = require('./routes/index')
const { systemMailPage, systemMail } = require('./routes/sysmail')

var client = mysql.createConnection({
    user: "root",
    password: "",
    host: "127.0.0.1",
    port: "3306",
    database: 'tahduth'
});

// connect to database
client.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

global.client = client;
global.session;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder //Middlewares
app.use(fileUpload()); // configure fileupload
//10.0.0.4
server = app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

//routes
app.get('/', loginUserPage);
app.post('/', loginUser);
app.get('/mail/:id', systemMailPage);
app.post('/mail/:id', systemMail);

//socket.io instantiation
const io = require("socket.io")(server)
var connectedUsers = {};

//siempre corre este ciclo cuando conecta un usuario por primera vez
//listen on every connection
io.on('connection', (socket) => {
    //console.log('New user connected')
    //default username

    var sendTo;
    socket.username = session.UName
    connectedUsers[session.idUsers] = socket;

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen change status of User 
    socket.on('change_status', (data) => {
        console.log(data.statusUser);
        console.log(data.userID);
        let queryStatus = "UPDATE users SET UState = '" + data.statusUser + "' WHERE idUsers = '" + data.userID + "'"
        client.query(queryStatus, (err, result) => {
            if (err) {
                console.log("ha ocurrido un error:" + err);
                //return res.status(500).send(err);
            }
        });

    })

    //listen on change user chat
    socket.on('openChat', (data) => {
        sendTo = data.idUsers
        console.log("openChat Value: " + sendTo);
    })

    socket.on('create_Group', (data) => {
        var idGroupRandomize = randomizePersonal('50')
        var Status = '1',
            i = 0;
        console.log("Id del grupo" + idGroupRandomize);
        console.log("longitud de los usuarios: " + data.idGroup.length);
        console.log("Contenido del arreglo general: " + data.idGroup);

        console.log("contenido del nombre del grupo: " + data.groupName);

        var queryMembers = "";
        // send the group's details to the database
        let query = "INSERT INTO `chat_group` (idChat_Group, CGUserMod, CGState, CGNameGroup) VALUES ('" +
            idGroupRandomize + "', '" + session.idUsers + "', '" + Status + "', '" + data.groupName + "')";
        client.query(query, (err, result) => {
            if (err) {
                console.log("ha ocurrido un error:" + err);
                //return res.status(500).send(err);
            }
        });

        while (i < data.idGroup.length) {
            console.log("Contenido del arreglo en ciclico: " + data.idGroup[i]);
            queryMembers = "INSERT INTO `chat_group_members` (idchat_group_members, CGMidChat, CGMidUsers) VALUES ('" +
                randomizePersonal("50") + "', '" + idGroupRandomize + "', '" + data.idGroup[i] + "')";
            client.query(queryMembers, (err, result) => {
                if (err) {
                    console.log("ha ocurrido un error:" + i + err);
                    //return res.status(500).send(err);
                }
            });
            i++;
        }
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //Sending new private message
        console.log("Usuario a SendTo: " + sendTo);
        console.log("Usuario conectados: " + Object.keys(connectedUsers));
        console.log("valor de session.idUsers: " + data.userID);
        //Sending new private message
        if (connectedUsers[sendTo] != null) {
            connectedUsers[sendTo].emit('new_message', { message: emoji.emojify(data.message), username: socket.username });
            if (sendTo != data.userID) {
                connectedUsers[data.userID].emit('new_message', { message: emoji.emojify(data.message), username: socket.username });
            }
        }
    })

    //listen on new_message
    socket.on('chat_buzz', (data) => {
        //Sending new private message
        console.log("Usuario a SendTo: " + sendTo);
        console.log("Usuario conectados: " + Object.keys(connectedUsers));
        console.log("valor de session.idUsers: " + data.userID);
        //Sending new private message
        if (connectedUsers[sendTo] != null) {
            connectedUsers[sendTo].emit('chat_buzz', { userID: data.userID });
            if (sendTo != data.userID) {
                connectedUsers[data.userID].emit('chat_buzz', { userID: data.userID });
            }
        }
    })

    //listen on new_message_group
    socket.on('new_message_group', (data) => {
        //Sending new group message
        console.log("Usuario a SendTo: " + sendTo);

        let queryGroup = "SELECT chat_group.CGNameGroup, chat_group_members.CGMidUsers FROM chat_group " +
            "INNER JOIN chat_group_members ON chat_group.idChat_Group = chat_group_members.CGMidChat " +
            "where chat_group_members.CGMidChat = '" + sendTo + "';"
        console.log(queryGroup);

        client.query(queryGroup, (err, resultGroupExist) => {
            j = 0;
            if (err) {
                console.log("Ha ocurrido un error al crear los grupos");
            }
            //console.log(resultGroupExist);
            // let resultgpAux = resultGroupExist;
            while (j < resultGroupExist.length) {
                console.log(resultGroupExist[j].CGMidUsers);
                if (connectedUsers[resultGroupExist[j].CGMidUsers] != null) {
                    connectedUsers[resultGroupExist[j].CGMidUsers].emit('new_message_group', { message: emoji.emojify(data.message), username: socket.username, namegroup: resultGroupExist[j].CGNameGroup });
                    /* if (resultGroupExist[j].CGMidUsers != data.userID) {
                        connectedUsers[data.userID].emit('new_message_group', { message: emoji.emojify(data.message), username: socket.username, namegroup: resultGroupExist[j].CGNameGroup });
                    } */
                }
                j++;
            }
        });
    })

    socket.on('stream', (data) => {

        console.log(data.image);
        if (connectedUsers[sendTo] != null) {
            connectedUsers[sendTo].emit('stream', { image: data.image });
        }
        //socket.broadcast.emit('stream', { image: data.image });
    })

    //listen on typing
    socket.on('typing', (data) => {
        if (connectedUsers[sendTo] != null) {
            connectedUsers[sendTo].emit('typing', { username: socket.username })
                //socket.broadcast.emit('typing', { username: socket.username })
        }

    })

})