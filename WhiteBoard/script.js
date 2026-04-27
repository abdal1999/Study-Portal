const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
let tool = 'pen';
let drawing = false;
let startX, startY;
let history = [];
let redoStack = [];

function saveState() {
  history.push(canvas.toDataURL());
  redoStack = [];
}

canvas.addEventListener('mousedown', e => {
  saveState();
  startX = e.offsetX;
  startY = e.offsetY;
  if (tool === 'pen' || tool === 'eraser' || tool === 'highlight') {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }
});

canvas.addEventListener('mousemove', e => {
  if (!drawing) return;
  ctx.lineWidth = tool === 'highlight' ? 20 : tool === 'eraser' ? 10 : 2;
  ctx.strokeStyle = tool === 'eraser' ? 'white' : tool === 'highlight' ? 'yellow' : 'black';
  ctx.globalAlpha = tool === 'highlight' ? 0.3 : 1;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.globalAlpha = 1;
});

function setTool(selected) {
  tool = selected;
}

function clearCanvas() {
  saveState();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function printCanvas() {
  const url = canvas.toDataURL();
  const win = window.open('', '_blank');
  win.document.write(`<img src="${url}" onload="window.print();window.close()" />`);
}

function downloadCanvas() {
  const link = document.createElement('a');
  link.download = 'whiteboard.png';
  link.href = canvas.toDataURL();
  link.click();
}

function undo() {
  if (history.length === 0) return;
  redoStack.push(canvas.toDataURL());
  const prev = history.pop();
  const img = new Image();
  img.src = prev;
  img.onload = () => ctx.drawImage(img, 0, 0);
}

function redo() {
  if (redoStack.length === 0) return;
  history.push(canvas.toDataURL());
  const next = redoStack.pop();
  const img = new Image();
  img.src = next;
  img.onload = () => ctx.drawImage(img, 0, 0);
}

function handleSubjectTool(toolName) {
  saveState();
  if (toolName === 'circle') {
    ctx.beginPath();
    ctx.arc(150, 150, 50, 0, Math.PI * 2);
    ctx.stroke();
  } else if (toolName === 'rectangle') {
    ctx.strokeRect(100, 100, 120, 80);
  } else if (toolName === 'arrow') {
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 100);
    ctx.lineTo(190, 90);
    ctx.moveTo(200, 100);
    ctx.lineTo(190, 110);
    ctx.stroke();
  } else if (toolName === 'graph') {
    drawGraph();
  } else if (toolName === 'text') {
    const text = prompt('Enter text:');
    if (text) ctx.fillText(text, 100, 100);
  } else if (toolName === 'highlight') {
    setTool('highlight');
  } else if (toolName === 'grammar') {
    ctx.fillText('˘ ˈ , ; “ ”', 100, 80);
  } else if (toolName === 'equation') {
    document.getElementById('equationInput').style.display = 'block';
  } else {
    insertImage(toolName);
  }
}

function drawGraph() {
  ctx.strokeStyle = '#ccc';
  for (let x = 0; x < canvas.width; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function insertImage(type) {
  const img = new Image();
  img.src = `assets/${type}.png`;
  img.onload = () => ctx.drawImage(img, 100, 100, 80, 80);
}

function renderEquation() {
  const latex = document.getElementById('latex').value;
  const div = document.createElement('div');
  div.innerHTML = `\\(${latex}\\)`;
  document.body.appendChild(div);
  MathJax.typesetPromise([div]).then(() => {
    const svg = div.querySelector('svg');
    const img = new Image();
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(xml);
    const b64Start = 'data:image/svg+xml;base64,';
    img.src = b64Start + svg64;
    img.onload = () => {
      ctx.drawImage(img, 200, 200);
      div.remove();
    };
  });
}
