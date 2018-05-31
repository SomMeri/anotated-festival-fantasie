
function addAnotationToNode(target, index) {
    var requestId = target.getAttribute('requestId');
    var elm = target.parentNode.parentNode.parentNode.parentNode;
    if (requestId != null && requestId != "null") {
        setTimeout(function() {
            // do not send too many requests at the same time
            sent_request(requestId, elm);
            console.log("Sent: ", requestId);
        }, index*400);
    }
}


function addAnnotations() {
    var x = document.getElementsByClassName("program_annotation");

    for (i = 0; i < x.length; i++) {
        addAnotationToNode(x[i], i);
    }

    console.log('-- done --');
};


function removeAnotationWindows() {
    var i = 0;
    var node = document.getElementById('anotace_window');
    while (node) {
        node.parentNode.remove();
        node = document.getElementById('anotace_window');
    }
}
