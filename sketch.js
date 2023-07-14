const densities = [
  "Ñ@#W$9876543210?!abc;:+=-,._",
  " .:-i|=+%O#@",
  " .:░▒▓█",
  " 1234567890",
  "@%#*+=-:.",
  "░▒▓█▇▆▅▄▃▂▁",
  "!abcdefghijklmnopqrstuvwxyz",
  "▁▂▃▄▅▆▇█▇▆▅▄▃▂▁",
  " abcdefghijk",
  "1234567890abcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+[]{}|;:',.<>/?`~ "
];
let currentDensityIndex = 0;

let video;
let asciiDiv;

const switchKey = 's'; // Define the key that triggers density switch

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(64, 48);
  asciiDiv = createDiv();
  
  document.addEventListener('keydown', switchDensity);
}

function draw() {
  video.loadPixels();
  let asciiImage = "";
  const density = densities[currentDensityIndex];
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}

function switchDensity(event) {
  if (event.key === switchKey) {
    currentDensityIndex = (currentDensityIndex + 1) % densities.length;
  }
}
