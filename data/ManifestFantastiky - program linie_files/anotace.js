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

    do_request();
    request.onreadystatechange = get_data;
    request.open("POST", url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send("id=" + id);

}

function get_data() {
    if (request.readyState == 4){

        var response = request.responseXML;
        var all = response.getElementsByTagName("porad")[0];    

        var title = all.getElementsByTagName("name")[0].firstChild.nodeValue;
        var obsah = all.getElementsByTagName("description")[0].firstChild.nodeValue;
    
        div = document.getElementById("anotace_window");

        var inner = "<div id=\"anotace_header\">" + title + "</div>\n";
        inner += "<div id=\"anotace_body\">\n";
        inner += obsah
        inner += "</div>\n";
        
        var left = 0;
        var top = 0;

        if (el != null) {
          	do {
        			left += el.offsetLeft;
        			top += el.offsetTop;
            }
            while (el = el.offsetParent);
        
        
            div.style.left = left + "px";
            div.style.top = top - 18 + "px";
            div.innerHTML = inner;
            div.style.display = "block";
        }
    }
}

function hide() {
    div.innerHTML = "";
    div.style.display = "none";
}
