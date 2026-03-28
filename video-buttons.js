console.log("Testing video buttons script");

let pausebtn = document.createElement("button");
pausebtn.textContent = "Check for media";
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

// Create fixed overlay div for buttons
const overlay = document.createElement('div');
overlay.id = 'extension-controls';
overlay.style.cssText = `
  position: fixed; top: 10px; right: 10px; z-index: 10000;
  background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 5px;
  display: flex; gap: 10px;
`;
document.body.appendChild(overlay);
overlay.appendChild(pausebtn);

// Page-specific functions: Find and control media elements
function playMedia() {
  const media = document.querySelector('video, audio');
  if (media) {
    media.play().catch(e => console.error('Play failed:', e));
  } else {
    console.log('No media found on this page');
  }
}

function pMedia() {
  const media = document.querySelector('video, audio');
  if(!media){
    console.log('No media found on this page');
    return;
  }

  if (!media.paused) {
    media.pause();
    pausebtn.textContent = " ▶ ";
  } else {
    media.play();
    pausebtn.textContent = " | | ";
  }
}

// Assign functions to buttons
pausebtn.addEventListener('click', pMedia);
