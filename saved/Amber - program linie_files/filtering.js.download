function adjustHeight(node) {
	var i = 0;
	var x = node.getElementsByClassName('program_annotation');
	var max = 10;
	for (i = 0; i < x.length; i++) {
		var kid = x[i];
		var body = kid.getElementsByClassName('anotace_body')[0];
		if (body) {
			if (body.scrollHeight > max) {
				max = body.scrollHeight;
			}
		}
	}
	max = max + 3;
	for (i = 0; i < x.length; i++) {
		var kid = x[i];
		kid.style.height = max + "px";
	}
}

function changeDay() {
	var i = 0;
	const currentSelection = document.forms["day-changer"].elements.dates.value;

	var x = document.getElementsByClassName("day-linie-block");
	for (i = 0; i < x.length; i++) {
		var node = x[i];
		if (currentSelection === "all") {
			node.style.display = "block";
		} else {
			var datum = node.getAttribute('datum');
			var match = datum.indexOf(currentSelection) > -1;
			node.style.display = match ? "block" : "none";
		}
		
		adjustHeight(node);
	}
}

function changeTime2() {
	const currentSelection = document.forms["time-changer"].elements.time.value;
	document.body.className = currentSelection;
}

function changeTime() {
	const currentSelection = document.forms["time-changer"].elements.time.value;
	document.body.className = currentSelection;

	const isEvening = currentSelection === "evening";
	var i = 0;
	var x = document.getElementsByClassName("program_all");
	for (i = 0; i < x.length; i++) {
		var table = x[i];
	}
}
