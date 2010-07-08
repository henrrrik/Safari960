
settings = {
  vertColor: '',
  vertOpacity: '',
  vertWidth: '',
  vertColumns: '',
  horizColor: '',
  horizOpacity: '',
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
  settings.vertColor = localStorage.getItem('vertColor') ? localStorage.getItem('vertColor') : '#FF0000';
  settings.vertOpacity = localStorage.getItem('vertOpacity') ? localStorage.getItem('vertOpacity') : 0.3;
  settings.vertWidth = localStorage.getItem('vertWidth') ? localStorage.getItem('vertWidth') : 10;
  settings.vertColumns = localStorage.getItem('vertColumns') ? localStorage.getItem('vertColumns') : 16;
  settings.horizColor = localStorage.getItem('horizColor') ? localStorage.getItem('horizColor') : '#0000FF';
  settings.horizOpacity = localStorage.getItem('horizOpacity') ? localStorage.getItem('horizOpacity') : 0.4;
  settings.horizHeight = localStorage.getItem('horizHeight') ? localStorage.getItem('horizHeight') : 16;
  settings.horizOffset = localStorage.getItem('horizOffset') ? localStorage.getItem('horizOffset') : 2;
  settings.gutters = localStorage.getItem('gutters') ? localStorage.getItem('gutters') : true;
  settings.paragraphs = localStorage.getItem('paragraphs') ? localStorage.getItem('paragraphs') : true;
  settings.invert = localStorage.getItem('invert') ? localStorage.getItem('invert') : false;
  settings.center = localStorage.getItem('center') ? localStorage.getItem('center') : true;
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
  overlay = document.createElement('div');
  overlay.setAttribute('id','safari-960');
  overlay.setAttribute('class', 'safari-960-col-'+ cols);
  overlay.setAttribute('style', 'height:'+ pageHeight +'px;');
  document.body.appendChild(overlay);
  
  grid = document.getElementById('safari-960');
  
  // Draw gutters
  var gutterWidth = (settings.vertWidth * 2);
  var gutterDistance = (960 / cols);
  var leftOffset = 0;
  for(i = 0; i <= cols; i ++) { // cols + 1
    gutterDiv = document.createElement('div');
    gutterDiv.setAttribute('class', 'safari-960-gutter');
    gutterDiv.setAttribute('style', 'height:'+ pageHeight +'px; width:'+ gutterWidth +'px; top:0; left:'+ leftOffset +'px;'
                           +' background-color:'+ settings.vertColor +'; opacity:'+ settings.vertOpacity +';');
    grid.appendChild(gutterDiv);
    leftOffset += gutterDistance;
  }
  
  // Draw lines 
  topOffset = settings.horizOffset;
  while (topOffset < pageHeight) {
    lineDiv = document.createElement('div');
    lineDiv.setAttribute('class', 'safari-960-line');
    lineDiv.setAttribute('style', 'top:'+ topOffset +'px;'
                           +' background-color:'+ settings.horizColor +'; opacity:'+ settings.horizOpacity +';');         
    grid.appendChild(lineDiv);
    topOffset += horizHeight;
  }
      
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
	if (e.which == 27) hideSettingsPanel();
};

// Settings panel

function displaySettingsPanel() {
  if (!document.getElementById('safari-960-settings')) {
    settingsPanel = document.createElement('div');
    settingsPanel.setAttribute('id','safari-960-settings');

//    settingsPanel.innerText = '
 //   <label for="vertcolor">
//    <input type="text" 
    
    
    
//    ';


//    vertColor
//    vertOpacity 
//    vertWidth
//    vertColumns 
//    horizColor
//    horizOpacity
//    horizHeight 
//    horizOffset 
//    gutters
//    paragraphs
//    invert
//    center


    document.body.appendChild(settingsPanel);
  }
}


function hideSettingsPanel() {
  if (document.getElementById('safari-960-settings')) {
    document.getElementById('safari-960-settings').setAttribute('style', 'display:none;');
  }  
}
