function handleMouseDown(e) {
  position.x = e.pageX - this.offsetLeft;
  position.y = e.pageY - this.offsetTop;
  isDrawing = true;
  drawField.moveTo(position.x, position.y);
}

function handleMouseMove(e) {
  if (isDrawing) {
    position.x = e.pageX - this.offsetLeft;
    position.y = e.pageY - this.offsetTop;
    drawField.fillStyle = app.currentColor;
    drawField.fillRect(calcPos(position.x), calcPos(position.y), app.scale, app.scale);
  }
}

function handleMouseUp(e) {
  position.x = e.pageX - this.offsetLeft;
  position.y = e.pageY - this.offsetTop;
  drawField.fillStyle = app.currentColor;
  drawField.fillRect(calcPos(position.x), calcPos(position.y), app.scale, app.scale);
  drawField.save();
  isDrawing = false;
}

function fillCanvas() {
  drawField.fillStyle = app.currentColor;
  drawField.fillRect(0, 0, app.pixels * app.scale, app.pixels * app.scale);
}

function getPixelColor(e) {
  position.x = e.pageX - this.offsetLeft;
  position.y = e.pageY - this.offsetTop;
  const imgData = drawField.getImageData(position.x, position.y, 1, 1).data;
  const r = imgData[0];
  const g = imgData[1];
  const b = imgData[2];
  const rgb = `rgb(${r}, ${g}, ${b})`;
  app.setColorToPixel(rgb);
}

function clearCanvas() {
  drawField.fillStyle = '#fff';
  drawField.fillRect(0, 0, app.pixels * app.scale, app.pixels * app.scale);
}

async function getImage() {
  const url = `${baseUrl}/random?query=town,Minsk&client_id=${accessKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const img = new Image();
    img.onload = () => {
      drawField.drawImage(img, 0, 0, 512, 512);
    };
    img.src = data.urls.thumb;
    img.setAttribute('crossOrigin', '');
  } catch (err) {
    drawField.fillText(`Something went wrong ${err.message}`, 5, 50);
  }
}

function saveImage() {
  const imageToSave = canvas.toDataURL();
  localStorage.setItem('saved data', imageToSave);
}
