$list = $('#list_of_online_people');

function list_all_online_nodes() {
    for (var i = 0; i < online_people_to_chat.length; i += 1) {
        var li = '<li><a href="#">' + online_people_to_chat[i] + '</a>';
        $list.append(li);
    }
}