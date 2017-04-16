var $username = $('#nickname');
function go_to_public_chatroom() {
    $username = $('#nickname').val();
    localStorage.setItem("storageName", $username);
    location.href = 'public';
}