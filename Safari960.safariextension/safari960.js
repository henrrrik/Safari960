function toggleGrid(cols) {
  
  if (document.getElementById('safari-960')) {
    existing = document.getElementById('safari-960');
    if (existing.getAttribute('class') == 'safari-960-col-'+ cols) {
      document.body.removeChild(existing);      
    }
    else {
      existing.setAttribute('class', 'safari-960-col-'+ cols);
    }
  }  
  else {
     if (!cols)
       cols = 16;
     pageHeight = getDocHeight();
     overlay = document.createElement('div');
     overlay.setAttribute('id','safari-960');
     overlay.setAttribute('class', 'safari-960-col-'+ cols);
     overlay.setAttribute('style', 'height:'+ pageHeight +'px;');
     document.body.appendChild(overlay);
   }
}   


function messageHandler(event) {
  if (window !== window.top) return;
  if (event.name === "toggle_grid") {
    toggleGrid(event.message);
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