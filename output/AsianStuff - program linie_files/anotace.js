var request;
var el;
var div;

function do_request() {
    if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else {
        request = new XMLHttpRequest();
    }
}

function sent_request(id, elm) {
    el = elm;
    var url = "./ajax/anotace.php";
    url = "http://amber.festivalfantazie.cz/ajax/anotace.php";

    do_request();
    request.onreadystatechange = get_data_request(request, elm);
    request.open("POST", url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send("id=" + id);
//    console.log('Sent ' + id);
}

function get_data_request(request, el) {

    function get_data() {
        if (request.readyState == 4) {

            var response = request.responseXML;
            var all = response.getElementsByTagName("porad")[0];

            var nameTag = all.getElementsByTagName("name")[0].firstChild;
            var title = nameTag ? nameTag.nodeValue : "";
            var obsahTag = all.getElementsByTagName("description")[0].firstChild;
            var obsah = obsahTag ? obsahTag.nodeValue : "";

            div = document.getElementById("anotace_window");

            var inner = "";
            inner += "<div class=\"anotace_body\">\n";
            inner += obsah
            inner += "</div>\n";

            //console.log(inner);

            var left = 0;
            var top = 0;

            if (el != null) {
                var table = el.firstChild.nextElementSibling;

                var row = table.rows[3];
                var cell1 = row.cells[0];

                cell1.classList.add("program_title");
                cell1.classList.add("program_annotation");
                cell1.innerHTML = inner;

            }
        }
    }
    return get_data;
}

function hide() {
    div.innerHTML = "";
    div.style.display = "none";
}
