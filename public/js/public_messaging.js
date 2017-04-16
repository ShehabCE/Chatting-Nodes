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

// jQuery(function ($) {
//     var socket = io.connect();
//     var $nickForm = $('#setNick');
//     var $nickError = $('#NickError');
//     var $nickBox = $('#nickname');
//
//
//     var $messageForm = $('#send-message');
//     var $messageBox = $('#message');
//     var $chat = $('#Chat');
//     var $users = $('#users');
//
//     $nickForm.submit(function (e) {
//         e.preventDefault();
//         socket.emit('new user', $nickBox.val(), function (data) {
//             if (data) {
//                 $('#NickWrap').hide();
//                 $('#ContentWrap').show();
//                 $('#ContentWrap').css({
//                     'vertical-align': 'middle'
//                 });
//             }
//             else {
//                 $nickError.html('That username is already taken! :(');
//             }
//         });
//         $nickBox.val('');
//     });
//
//     socket.on('usernames', function (data) {
//         var html = '<strong><u>Online Nodes</u></strong><br>';
//         for (i = 0; i < data.length; i++) {
//             html += ' -' + data[i] + '<br/>'
//         }
//         $users.html(html);
//
//     });
//
//     $messageForm.submit(function (e) {
//         e.preventDefault();
//         socket.emit('send message', $messageBox.val());
//         $messageBox.val('');
//
//     });
//
//     socket.on('New Message', function (data) {
//         $chat.append('<strong>' + data.nick + ': </strong>' + data.msg + '</br>');
//     });
// });
