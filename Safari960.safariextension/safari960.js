
// Global settings
settings = {};

// Get settings from localStorage if available
function getSettings() {
  
  // Defaults
  settings.vertcolor = 'rgba(238, 238, 238, 0.3)';
  settings.vertwidth = 10;
  settings.vertcolumns = 16;
  settings.horizcolor = 'rgba(192, 192, 192, 0.4)';
  settings.horizheight = 15;
  settings.horizoffset = 0;
  settings.gutters = true;
  settings.paragraphs = true;
  settings.invert = false;
  settings.center= true;
  
  saved_settings = JSON.parse(localStorage.getItem('safari960'));
  if (saved_settings) {
    settings = saved_settings;
  }
}

function flushSettings() {
  localStorage.removeItem('safari960');
}

function saveSettings() {
  settingsPane = document.getElementById('safari-960-settings');
  for (var setting in settings) {
    settingElement = document.getElementById(setting);
    // If the checkbox value is "on" we make the setting true.
    if (settingElement.getAttribute('type') == 'checkbox') {
      if (settingElement.value) {
        settings[setting] = true;
      }
      else {
        settings[setting] = false;
      }
    }
    else {
      settings[setting] = settingElement.value;      
    }
  }
  localStorage.setItem('safari960', JSON.stringify(settings));
  
  // Refresh grid
  showGrid();
}

// Toggle grid on or off depending on state
function toggleGrid() {
  if (document.getElementById('safari-960')) {
    removeGrid();
  }
  else {
    showGrid();    
  }
}

function removeGrid() {
  document.body.removeChild(document.getElementById('safari-960'));        
}

function removeSettingsPanel() {
  document.body.removeChild(document.getElementById('safari-960-settings'));        
}

function showGrid() {
  getSettings();
  // Make sure we don't we're not displaying a grid already.
  if (document.getElementById('safari-960')) {
    removeGrid();
  }

  // Make sure we are using integers
  cols = parseInt(settings.vertcolumns, 10);
  horizheight = parseInt(settings.horizheight, 10);
  horizoffset = parseInt(settings.horizoffset, 10);
  vertwidth = parseInt(settings.vertwidth, 10);
  
  pageHeight = getDocHeight();
  
  // Insert the canvas
  overlay = document.createElement('canvas');
  overlay.setAttribute('id','safari-960');
  if (settings.center) {
    overlay.setAttribute('class', 'center');    
  }
  overlay.setAttribute('width', 980);
  overlay.setAttribute('height', pageHeight);  
  document.body.appendChild(overlay);

  var context = overlay.getContext("2d");

  if (settings.gutters) {
    // Draw gutters
    var gutterWidth = (vertwidth * 2);
    var gutterDistance = (960 / cols);
    var leftOffset = 0;
    context.fillStyle = settings.vertcolor;

    if (!settings.invert) {
      for(i = 0; i <= cols; i ++) { // cols + 1
        context.fillRect(leftOffset, 0, gutterWidth, pageHeight);
        leftOffset += gutterDistance;
      }      
    }
    else {
      // Draw columns

      colWidth = (960 / cols) - gutterWidth;

      leftOffset = gutterWidth;

      for(i = 0; i < cols; i ++) {
        context.fillRect(leftOffset, 0, colWidth, pageHeight);
        leftOffset += (colWidth + gutterWidth);
      }      
    }
  }

  if (settings.paragraphs) {
    // Draw lines 
    for (var y = horizoffset + 0.5; y < pageHeight; y = y + horizheight) {
      context.moveTo(0, y);
      context.lineTo(980, y);
    }

    context.strokeStyle = settings.horizcolor;
    context.stroke();    
  }
}   



function messageHandler(event) {
  if (window !== window.top) return;
  if (event.name === "toggle_grid") {
    toggleGrid();
  }
  if (event.name === "grid_settings") {
    showSettingsPanel();
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

document.onkeyup = function(e) {
	if (e.which == 17) isCtrl = false;
	if (e.which == 18) isAlt = false;
};

document.onkeydown = function(e) {
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
	if (e.which == 27) {
	  removeSettingsPanel();
  }
};

// Settings panel
function showSettingsPanel() {
  showGrid();
  
  // If there's a panel on the page already, remove it.
  if (document.getElementById('safari-960-settings')) {
    removeSettingsPanel();
  }
  settingsPanel = document.createElement('div');
  settingsPanel.setAttribute('id','safari-960-settings');
  
  settingsPanel.innerHTML = '<div class="settings-h1">Grid Settings for '+window.location.hostname+'</div><div id="vertical-setup"><div class="settings-h2">Vertical</div><div class="label label-vertcolor">Color</div><input type="text" size="30" id="vertcolor" value="'+settings.vertcolor+'" /><div class="label label-vertwidth"">Width</div><input type="text" size="30" id="vertwidth" value="'+settings.vertwidth+'" /><div class="label label-vertcolumns">Columns</div><select id="vertcolumns" value="'+settings.vertcolumns+'" ><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="10">10</option><option value="12">12</option><option value="15">15</option><option value="16">16</option><option value="20">20</option><option value="24">24</option><option value="30">30</option><option value="32">32</option><option value="40">40</option></select></div><div id="horizontal-setup"><div class="settings-h2">Horizontal</div><div class="label label-horizcolor">Color</div><input type="text" size="30" id="horizcolor" value="'+settings.horizcolor+'" /><div class="label label-horizheight">Height</div><input type="text" size="30" id="horizheight" value="'+settings.horizheight+'" /><div class="label label-horizoffset">Offset</div><input type="text" size="30" id="horizoffset" value="'+settings.horizoffset+'" /></div><div id="misc-setup"><div class="settings-h2">Misc</div><div class="block-item"><div class="label label-gutters">Enable vertical (gutters)</div><input id="gutters" type="checkbox" '+((settings.gutters == true) ? 'checked' :'')+' /></div><div class="block-item"><div class="label label-paragraphs">Enable horizontal (paragraphs)</div><input id="paragraphs" type="checkbox" '+((settings.paragraphs == true) ? 'checked' :'')+' /></div><div class="block-item"><div class="label label-invert">Invert vertical</div><input id="invert" type="checkbox" '+((settings.invert == true) ? 'checked' :'')+' /></div><div class="block-item"><div class="label label-center">Center grid</div><input id="center" type="checkbox" '+((settings.center == true) ? 'checked' :'')+' /></div><div class="buttons"><a class="settings-button" id="reset" href="#"">Reset</a><a class="settings-button" id="ok" href="#"">OK</a></div></div>';
  
  document.body.appendChild(settingsPanel);
  document.getElementById('vertcolumns').value = settings.vertcolumns;
  
  document.getElementById('ok').onclick = function() {  
    saveSettings();
    removeSettingsPanel();
    return false;  
  };

  // Revert to default settings
  document.getElementById('reset').onclick = function() {  
    flushSettings();
    removeSettingsPanel();
    showSettingsPanel();
    return false;  
  };
  
  // Set event handlers that save the various settings on change with a delay.
  for (var setting in settings) {
    form_element = document.getElementById(setting);
    if (form_element.tagName == 'INPUT' && form_element.getAttribute('type') == 'text') {
      form_element.onkeyup = function() {
        actionWatch(function(){saveSettings();}, 1000);
      };
    }
    else {
      form_element.onchange = function() {
        actionWatch(function(){saveSettings();}, 0);
      };
    } 
  }
  
  
}

// Helper function for delaying an action
var actionWatch = function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
}();
