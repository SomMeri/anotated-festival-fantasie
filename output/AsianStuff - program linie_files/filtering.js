function changeDay() {
    const currentSelection = document.forms["day-changer"].elements.dates.value;

    var x = document.getElementsByClassName("day-linie-block");
    for (i = 0; i < x.length; i++) {
        const node = x[i];
	if (currentSelection === "all") {
    	    node.style.display = "block";   
	} else {
	        var datum = node.getAttribute('datum');
		var match = datum.indexOf(currentSelection) > -1;
		node.style.display = match ? "block" : "none"; 
	}
    }
}
