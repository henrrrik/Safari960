
settings = {
  vertColor: '',
  vertWidth: '',
  vertColumns: '',
  horizColor: '',
  horizHeight: '',
  horizOffset: '',
  gutters: '',
  paragraphs: '',
  invert: '',
  center: ''
};

var activeCols = 0;
getSettings();

function getSettings() {
  settings.vertColor = localStorage.getItem('vertColor') || 'rgba(238, 238, 238, 0.3)';
  settings.vertWidth = localStorage.getItem('vertWidth') || 10;
  settings.vertColumns = localStorage.getItem('vertColumns') || 16;
  settings.horizColor = localStorage.getItem('horizColor') || 'rgba(192, 192, 192, 0.4)';
  settings.horizHeight = localStorage.getItem('horizHeight') || 15;
  settings.horizOffset = localStorage.getItem('horizOffset') || 0;
  settings.gutters = localStorage.getItem('gutters') || true;
  settings.paragraphs = localStorage.getItem('paragraphs') || true;
  settings.invert = localStorage.getItem('invert') || false;
  settings.center = localStorage.getItem('center') || true;
}

function toggleGrid(cols) {
  
  if (document.getElementById('safari-960')) {
    document.body.removeChild(document.getElementById('safari-960'));      
  }  
  if (!cols) cols = settings.vertColumns;
  
  // If same number of cols as currently active, switch them off.
  if (cols === activeCols) {
    activeCols = 0;
    return;
  }
  else {
    activeCols = cols;
  }
  
  pageHeight = getDocHeight();
  
  /* Insert the canvas */
  overlay = document.createElement('canvas');
  overlay.setAttribute('id','safari-960');
  overlay.setAttribute('class', 'safari-960-col-'+ cols);
  overlay.setAttribute('width', 980);
  overlay.setAttribute('height', pageHeight);  
  document.body.appendChild(overlay);

  var context = overlay.getContext("2d");

  // Draw gutters
  var gutterWidth = (settings.vertWidth * 2);
  var gutterDistance = (960 / cols);
  var leftOffset = 0;
  context.fillStyle = settings.vertColor;

  for(i = 0; i <= cols; i ++) { // cols + 1
    context.fillRect(leftOffset, 0, gutterWidth, pageHeight);
    leftOffset += gutterDistance;
  }

  // Draw lines 
  for (var y = settings.horizOffset + 0.5; y < pageHeight; y += settings.horizHeight) {
    context.moveTo(0, y);
    context.lineTo(980, y);
  }
  context.strokeStyle = settings.horizColor;
  context.stroke();
}   



function messageHandler(event) {
  if (window !== window.top) return;
  if (event.name === "toggle_grid") {
    toggleGrid(event.message);
  }
  if (event.name === "grid_settings") {
    displaySettingsPanel();
  }
}
safari.self.addEventListener("message", messageHandler, false);

function getDocHeight() {
    return Math.max(
        Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
        Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
        Math.max(document.body.clientHeight, document.documentElement.clientHeight)
    );
}


// Keyboard shortcuts

var isCtrl = false;
var isAlt = false;

document.onkeyup = function(e){
	if (e.which == 17) isCtrl = false;
	if (e.which == 18) isAlt = false;
};

document.onkeydown = function(e){
	if (e.which == 17) isCtrl = true;
	if (e.which == 18) isAlt = true;
	if (e.which == 67 && isCtrl == true && isAlt == true) {
		// Ctrl+Alt+C
		toggleGrid();
	}
	if (e.which == 65 && isCtrl == true && isAlt == true) {
		// Ctrl+Alt+A
		// TODO: Invert grid
	}
};

