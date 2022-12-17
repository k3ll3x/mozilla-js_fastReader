/*

Fast Reader for pages, mozilla extension

Author: Siegfried Keller

note: the code presented is a mixture of what 
I thought and implementations taken from stackoverflow,
I would like to thank the community for their work and
a final statement that information must be universal.

LICENCE: Open-Source, but y'all know... if you make a profit out of this, contact me and maybe contribute by donating :)

 */

let text = document.body.innerText;

let pause = false;

let reader = document.createElement("h1");
reader.style = "text-align:center;";

let pausebtn = document.createElement("button");
pausebtn.textContent = "Pause";
pausebtn.onclick = () => {
	pause = !pause;
	if(pause){
		pausebtn.textContent = "Play";
	}else{
		pausebtn.textContent = "Pause";
	}
}
pausebtn.style = `
	cursor: pointer; 
	border: 1px solid #888888; 
	background-color: transparent;
	color: #888888; 
	font-size: 1em;
	float: right;
	position: -webkit-sticky;
	position: sticky;
	box-shadow: 0 6px 6px rgba(0, 0, 0, 0.6); 
`;

let readerContainer = document.createElement("div");
readerContainer.append(document.createElement("br"));
readerContainer.style = `
	width: 100%;
	height: 90%;
	z-index: 4;
	text-align:center;
	color: black;
	float: right;
	font-color: black;
	background-color: rgba(255,255,255,0.6);
	position: -webkit-sticky;
	position: sticky;
	top: 25%;
	font-size: 6em;
`;
readerContainer.append(reader);
readerContainer.append(document.createElement("br"));

readerContainer.appendChild(document.createElement("br"));
readerContainer.appendChild(pausebtn);

readerContainer.id = "freader";

let velocity = document.createElement("input");
velocity.type = "range";
velocity.min = 50;
velocity.max = 1000;
velocity.value = 150;
velocity.style = "direction: rtl";

let activate = document.createElement("button");
activate.textContent = "Read This Page Fast";
activate.onclick = () => {
	readFast();
}
activate.style = `
	cursor: pointer; 
	border: 1px solid #888888; 
	background-color: transparent;
	color: #888888; 
	box-shadow: 0 6px 6px rgba(0, 0, 0, 0.6); 
`;

let container = document.createElement('div');
container.appendChild(velocity);
container.appendChild(document.createElement("br"));
container.appendChild(activate);

container.style = `
	z-index: 5;
	float: right;
	position: -webkit-sticky;
	position: sticky;
	top: 22%;
`;

document.body.prepend(container);

function readFast(){
	console.log("reading page text at given velocity: " + velocity.value);
	document.body.prepend(readerContainer);
	anim(text);
}

async function anim(text){
	let words = text.match(RegExp('\\w+','g'));
	
	for(let i in words)	{
		reader.innerText = words[i];
		//highlight(words[i]);
		await sleep(velocity.value);
		while(pause){
			await sleep(1000);
		}
	}

	removeElement("freader");
}

//sleep
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function removeElement(elementId) {
	// Removes an element from the document
	var element = document.getElementById(elementId);
	element.parentNode.removeChild(element);
}

/*function highlight(word) {
	return new Promise(res => () => {
		document.body.innerHTML = document.body.innerHTML.replace(`/${word}/g`, `<b><i>${word}</i></b>`);
		//setTimeout(res, velocity.value)
		//document.body.innerHTML = document.body.innerHTML.replace(`<b><i>${word}</i></b>`, word);
	});
}*/

//change button if text is selected and use that text
function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
		text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
		text = document.selection.createRange().text;
    }
    return text;
}

function setSelectedText() {
    var selectedText = getSelectedText();
    if (selectedText) {
		//alert("Got selected text " + selectedText);
		text = selectedText;
		activate.textContent = "Read Selected Text Fast";
    }
}

document.onmouseup = setSelectedText;
document.onkeyup = setSelectedText;