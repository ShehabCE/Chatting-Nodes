var $username = $('#nickname');
function go_to_public_chatroom() {
    $username = $('#nickname').val();
    location.href = 'public';
}