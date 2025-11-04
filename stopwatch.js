let timer = null;
let startTime = 0;
let elapsedTime = 0;  
let isRunning = false;

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;      
    timer = setInterval(update, 10);           
    isRunning = true;
  }
}

function stop() {
  if (isRunning) {
    clearInterval(timer);
    timer = null;
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function reset() {
  clearInterval(timer);
  timer = null;
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
  document.getElementById("display").textContent = "00:00:000";
  
  // Reset pointer to 0 degrees
  document.getElementById("pointerGroup").setAttribute("transform", "rotate(0 150 150)");
}

function update() {
  const now = Date.now();
  const ms = now - startTime;

  // Update elapsed time
  elapsedTime = ms;

  // Format time display
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const millis  = ms % 1000;

  const text =
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + ":" +
    String(millis).padStart(3, "0");

  document.getElementById("display").textContent = text;

  // Update circular pointer rotation
  // Complete one full rotation (360 degrees) every 60 seconds (60000 ms)
  const rotation = (ms % 60000) / 60000 * 360;
  document.getElementById("pointerGroup").setAttribute(
    "transform", 
    `rotate(${rotation} 150 150)`
  );
}