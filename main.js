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
let i = 0;
let words = [];

let pause = false;
let breakanim = false;

let reader = document.createElement("p");
reader.style = `
	text-align:center;
	font-size: 6em;
	color: #000000;
`;

let pausebtn = document.createElement("button");
pausebtn.textContent = " | | ";
pausebtn.onclick = () => {
	pause = !pause;
	if(pause){
		pausebtn.textContent = " ▶ ";
	}else{
		pausebtn.textContent = " | | ";
	}
}
pausebtn.style = `
	font-size: 2em;
	cursor: pointer; 
	border: 1px solid #888888; 
	background-color: transparent;
	color: #888888;
	bottom: 10%;
	float: center;
	position: -webkit-sticky;
	position: sticky;
	box-shadow: 0 6px 6px rgba(0, 0, 0, 0.6); 
`;

let closebtn = document.createElement("button");
closebtn.textContent = " X ";
closebtn.onclick = () => {
	pause = true;
	breakanim = true;
	activate.disabled = false;
}
closebtn.style = `
	font-size: 2em;
	cursor: pointer; 
	border: 1px solid #888888; 
	background-color: transparent;
	color: #ff0000; 
	float: right;
	top: 10%;
	position: -webkit-sticky;
	position: sticky;
	box-shadow: 0 6px 6px rgba(0, 0, 0, 0.6); 
`;

let readerContainer = document.createElement("div");
readerContainer.appendChild(closebtn);
readerContainer.append(document.createElement("br"));
readerContainer.style = `
	width: 100%;
	z-index: 5;
	text-align:center;
	color: black;
	float: right;
	background-color: rgba(255,255,255,0.6);
	position: -webkit-sticky;
	// position: sticky;
	position: fixed;
	top: 25%;
`;
readerContainer.append(reader);

readerContainer.append(document.createElement("br"));

readerContainer.appendChild(document.createElement("br"));
readerContainer.appendChild(pausebtn);

let words_index = document.createElement("input");
words_index.type = "range";
words_index.min = 0;
words_index.value = 0;
words_index.oninput = (e) => {
	i = e.target.value;
};
words_index.style = `
	width: 100%;
`;

readerContainer.appendChild(words_index);

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
	activate.disabled = true;
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
	z-index: 6;
	float: right;
	position: -webkit-sticky;
	// position: sticky;
	position: fixed;
	top: 22%;
`;

document.body.prepend(container);

function readFast(){
	console.log("reading page text at given velocity: " + velocity.value);
	document.body.prepend(readerContainer);
	words = text.match(RegExp('\\w+','g'));
	words_index.max = words.length;
	anim();
}

async function anim(){
	pausebtn.textContent = " | | ";
	for(i = 0; i < words.length; i++){
		reader.innerText = words[i];
		words_index.value = i;
		// highlight(words[i]);
		await sleep(velocity.value);
		if(pause){
			i--;
		}
		if(breakanim){
			breakanim = false;
			pause = false;
			removeElement("freader");
			return;
		}
	}

	removeElement("freader");
	activate.disabled = false;
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

// function highlight(word) {
// 	return new Promise(res => () => {
// 		document.body.innerHTML = document.body.innerHTML.replace(`/${word}/g`, `<b><i>${word}</i></b>`);
// 		//setTimeout(res, velocity.value)
// 		//document.body.innerHTML = document.body.innerHTML.replace(`<b><i>${word}</i></b>`, word);
// 	});
// }

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