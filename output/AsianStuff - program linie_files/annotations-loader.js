
function addAnotationToNode(target) { 
        var requestId = target.getAttribute('requestId');
        var elm = target.parentNode.parentNode.parentNode.parentNode;
        if (requestId!=null) {
            sent_request(requestId, elm);
        }
}


function addAnnotations() { 
    var x = document.getElementsByClassName("program_annotation");

    for (i = 0; i < x.length; i++) {
        addAnotationToNode(x[i]);
    }

    console.log('-- done --');
};