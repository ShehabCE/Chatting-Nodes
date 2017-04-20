var socket = io.connect();
var $Chat = $('#ChatBox');
var $online_users = $('#online-users');
var online_people_to_chat = [];
function send_public_message() {
    var message = document.getElementById('message').value;
    socket.emit('send message', message);
    document.getElementById('message').value = '';
}

function new_message(data) {
    var message_div = '<div id="single_message"><strong>' + data.nick + ': </strong>' + data.msg + '</br>';
    $Chat.append(message_div);
}

function joined_public_chat() {
    var user = localStorage.getItem("storageName");
    socket.emit('new user', user, function (data) {
    });

    socket.on('usernames', function (data) {
        var list_of_online_users = '<I>Online Nodes</I><br>';
        for (var i = 0; i < data.length; i += 1) {
            online_people_to_chat[i] = data[i];
            list_of_online_users += '-<a>' + data[i] + '</a><br/>';
        }
        $online_users.html(list_of_online_users);
    })
}

socket.on('New Message', function (data) {
    new_message(data);
});


// Execution starts here...
joined_public_chat();
