jQuery(function ($) {
    var socket = io.connect();
    var $nickForm = $('#setNick');
    var $nickError = $('#NickError');
    var $nickBox = $('#nickname');


    var $messageForm = $('#send-message');
    var $messageBox = $('#message');
    var $chat = $('#Chat');
    var $users = $('#users');

    $nickForm.submit(function (e) {
        e.preventDefault();
        socket.emit('new user', $nickBox.val(), function (data) {
            if (data) {
                $('#NickWrap').hide();
                $('#ContentWrap').show();
                $('#ContentWrap').css({
                    'vertical-align': 'middle'
                });
            }
            else {
                $nickError.html('That username is already taken! :(');
            }
        });
        $nickBox.val('');
    });

    socket.on('usernames', function (data) {
        var html = '<strong><u>Online Nodes</u></strong><br>';
        for (i = 0; i < data.length; i++) {
            html += ' -' + data[i] + '<br/>'
        }
        $users.html(html);

    });

    $messageForm.submit(function (e) {
        e.preventDefault();
        socket.emit('send message', $messageBox.val());
        $messageBox.val('');

    });

    socket.on('New Message', function (data) {
        $chat.append('<strong>' + data.nick + ': </strong>' + data.msg + '</br>');
    });
});
