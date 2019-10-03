$(function() {
    //make connection  
    var socket = io.connect('http://10.0.0.4:3000')
        //var socket = io.connect('http://localhost:3000')
        //Variable of control
    var CtrlMessage = false,
        CtrlMessageVideo = false,
        CtrlMessageEmojis = false;
    //buttons and inputs
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_message_group = $("#send_message_group")
    send_message_group.hide();
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")

    var canvas = document.getElementById("preview");
    var context = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 600;

    context.width = canvas.width;
    context.height = canvas.height;

    var video = document.getElementById("video");

    function logger(msg) {
        $("#logger").text(msg);
    }

    function loadCam(stream) {
        video.srcObject = stream;
        video.play();
        //video.src = window.URL.createObjectURL(stream);
        logger('Camara cargada correctamente');
    }

    function loadFail() {
        logger('Camara no conectada, revisar camara');
    }

    /* function viewVideo(video, context, userID) {
        context.drawImage(video, 0, 0, context.width, context.height);
        socket.emit('stream', { image: canvas.toDataURL('image/webp'), userID: userID })
    } */
    function viewVideo(video, context) {
        context.drawImage(video, 0, 0, context.width, context.height);
        socket.emit('stream', { image: canvas.toDataURL('image/webp') })
    }

    $("#slider-title-makeVideo").click(function() {
        dragVideo();
        var userID = $("#slider-title-message").attr("class");
        navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msgGetUserMedia);
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ video: true }, loadCam, loadFail);
        }

        setInterval(function() {
            viewVideo(video, context);
        }, 70);
    });

    socket.on("stream", (data) => {
        var img = document.getElementById("play");
        img.src = data.image;
        //$("#logger").text(image);
    });

    $(document).on('click', '#sidebar-user-box', function() {
        send_message.show();
        send_message_group.hide();
        var userID = $(this).attr("class");
        var username = $(this).children().text();
        console.log("Atributo userID: " + userID);
        console.log("Atribto username: " + username);
        if (userID != "group-add") {
            $('#change_username_message').text("chateando con: " + username);
            socket.emit('openChat', { idUsers: userID })
        } else {
            console.log("Se activado el chat de grupo:" + userID);
            drag();
        }
    })

    $(document).on('click', '#sidebar-group-box', function() {
        send_message_group.show();
        send_message.hide();
        var userID = $(this).attr("class");
        var username = $(this).children().text();
        console.log("Atributo userID: " + userID);
        console.log("Atribto username: " + username);
        if (userID != "group-add") {
            $('#change_username_message').text("chateando en el grupo: " + username);
            socket.emit('openChat', { idUsers: userID })
        } else {
            console.log("Se activado el chat de grupo:" + userID);
            drag();
        }
    })

    $(document).on('click', '#dragbtn', function() {
        drag();
    })

    $(document).on('click', '#showemojis', function() {
        dragEmojis();
    })

    $(document).on('click', '#emojibuttons', function() {
        var chatContent = $("#message").val();
        var nameEmoji = $(this).attr("class");
        console.log(nameEmoji);
        $("#message").val(chatContent + " :" + nameEmoji + ": ");
    })

    $(document).ready(function() {
        $("#myModal").hide();
        $("#myModal2").hide();
        $("#panel_emojis").hide();
        $(function() {
            $("#myModal").draggable();
            $("#myModal2").draggable();
            $("#panel_emojis").draggable();
        })
    })

    function drag() {
        if (CtrlMessage != true) {
            $("#myModal").show();
            CtrlMessage = true;
        } else {
            $("#myModal").hide();
            CtrlMessage = false;
        }
    }

    function dragVideo() {
        if (CtrlMessageVideo != true) {
            $("#myModal2").show();
            CtrlMessageVideo = true;
        } else {
            $("#myModal2").hide();
            CtrlMessageVideo = false;
        }
    }

    function dragEmojis() {
        if (CtrlMessageEmojis != true) {
            $("#panel_emojis").show();
            CtrlMessageEmojis = true;
        } else {
            $("#panel_emojis").hide();
            CtrlMessageEmojis = false;
        }
    }

    $(document).on('click', '#buzz', function() {
        var userID = $("#slider-title-message").attr("class");
        socket.emit('chat_buzz', { userID: userID })
    })

    $(document).on('click', '#statusConnection', function() {
        var userID = $("#slider-title-message").attr("class");
        var statusConnect = $(this).attr("class");
        var status = 0;
        console.log(statusConnect);
        if (statusConnect == "toggle-btn active") {
            status = 1;
        } else {
            status = 0;
        }
        console.log(status);
        socket.emit('change_status', { statusUser: status, userID: userID })
        location.reload();
    })

    $('select[multiple].GroupUsers').multiselect({
        columns: 1,
        placeholder: 'Select Users',
        search: true,
        searchOptions: {
            'default': 'Search Users'
        },
        selectAll: true
    });

    $('select[multiple]').siblings('#Create_Group').click(function(event) {
        event.preventDefault();
        var arreglo = $(this).siblings('select[multiple]').val()
        var groupName = $("#groupName").val();
        if (arreglo.length != 0) {
            socket.emit('create_Group', { idGroup: arreglo, groupName: groupName })
                //location.reload();
        } else {
            alert("Por favor seleccione usuarios validos");
        }
    });

    $("#Cancel").click(function() {
        location.reload();
    });

    //Emit message
    send_message.click(function() {
        var userID = $("#slider-title-message").attr("class");
        socket.emit('new_message', { message: message.val(), userID: userID })
    })

    send_message_group.click(function() {
        var userID = $("#slider-title-message").attr("class");
        socket.emit('new_message_group', { message: message.val(), userID: userID })
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        //The append() method inserts specified content at the end of the selected elements.
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //Listen on new_message
    socket.on("chat_buzz", (data) => {
        $("body").css("animation", "shake 0.5s");

        setTimeout(function() {
            $("body").css("animation", "none");
        }, 500);
    })

    //Listen on new_message_group
    socket.on("new_message_group", (data) => {
        feedback.html('');
        message.val('');
        //The append() method inserts specified content at the end of the selected elements.
        chatroom.append("<p class='message'>" + data.username + " in " + data.namegroup + ": " + data.message + "</p>")
    })

    //Emit a username
    send_username.click(function() {
        socket.emit('change_username', { username: username.val() })
    })

    //Emit typing
    message.bind("keypress", () => {
        socket.emit('typing')
    })

    //Listen on typing
    socket.on('typing', (data) => {
        console.log("dando typing");
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    })

});