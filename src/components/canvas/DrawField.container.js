import React from 'react';
import { findDOMNode } from 'react-dom';

import * as S from './DrawField.style';

const FIELD_SIZE = 128;

// const calcScaleRate = (pix) => FIELD_SIZE / pix;

function getLinePath(pos0, pos1) {
  let { x, y } = pos0;
  const dx = Math.abs(x - pos1.x);
  const dy = Math.abs(y - pos1.y);
  const sx = (x < pos1.x) ? 1 : -1;
  const sy = (y < pos1.y) ? 1 : -1;
  let error = dx - dy;
  const coord = [];

  while (true) {
    coord.push({ x, y });

    if ((x === pos1.x) && (y === pos1.y)) {
      break;
    }

    const e2 = error * 2;
    if (e2 > -dy) {
      error -= dy;
      x += sx;
    }
    if (e2 < dx) {
      error += dx;
      y += sy;
    }
  }

  return coord;
}

class DrawField extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      tool: 'line',
      pixels: 1,
      scale: 1,
      drawField: {},
      isDrawing: false,
      color: 'rgb(200, 33, 44)',
      oldX: null,
      oldY: null,
      currentFrame: null,
      frameId: null,
    }
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.calcPos = this.calcPos.bind(this);
  }

  calcPos(pos) {
    const scale = 500 / 128;
    return Math.floor(pos / scale) * scale;
  }

  saveImage() {
    const imageToSave = this.canvas.toDataURL();
    console.log(imageToSave)
    this.setState({ currentFrame: imageToSave });  
    this.props.onFrameChange(imageToSave);
  }

  handleMouseDown(e) {
    const position = {};
    position.x = e.pageX - this.drawField.canvas.offsetLeft;
    position.y = e.pageY - this.drawField.canvas.offsetTop;
    this.setState({ isDrawing: true});
    this.drawField.moveTo(position.x, position.y);
  }
  
  handleMouseMove(e) {
    if (!this.state.isDrawing) {
      return;
    }
    const scale = 500 / 128;
    const position = {};
    position.x = e.pageX - this.drawField.canvas.offsetLeft;
    position.y = e.pageY - this.drawField.canvas.offsetTop;
  
    if (this.state.oldX !== null) {
      getLinePath(position, { x: this.state.oldX, y: this.state.oldY }).forEach(({ x, y }) => {
        this.drawField.beginPath();
        this.drawField.fillStyle = this.state.color;
        this.drawField.fillRect(this.calcPos(x), this.calcPos(y), scale, scale);
      });
    }
    this.setState({ oldX: position.x});
    this.setState({ oldY: position.y});
  }
  
  handleMouseUp(e) {
    const position = {};
    const scale = 500 / 128;
    position.x = e.pageX - this.drawField.canvas.offsetLeft;
    position.y = e.pageY - this.drawField.canvas.offsetTop;
    this.drawField.fillStyle = this.state.color;
    this.drawField.fillRect(this.calcPos(position.x), this.calcPos(position.y), scale, scale);
    this.saveImage();
    this.setState({ isDrawing: false});
    this.setState({ oldX: null});
    this.setState({ oldY: null});
  }

  componentDidMount() {
    this.canvas = findDOMNode(this.canvasRef);
    this.drawField = this.canvas.getContext('2d');
    // this.drawField.clearRect(0, 0, 500, 500)
    // this.drawField.fillStyle = 'grey';
    // this.drawField.fillRect(0, 0, 500, 500);
  }

  render() {
    console.log(this.props)
    return (
      <div>
        Drawfield
        {this.props.frameId}
        <S.Canvas 
          ref={(canvas) => { this.canvasRef = canvas; }}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          // onMouseOut={this.onMouseUp}
          onMouseUp={this.handleMouseUp}
          width={500}
          height={500}
        />
        {/* <DrawFieldCanvas /> */}
      </div>
    )
  }
}

export default DrawField;

  
  // fillCanvas() {
  //   drawField.fillStyle = app.currentColor;
  //   drawField.fillRect(0, 0, app.pixels * app.scale, app.pixels * app.scale);
  // }
  
  // getPixelColor(e) {
  //   position.x = e.pageX - this.offsetLeft;
  //   position.y = e.pageY - this.offsetTop;
  //   const imgData = drawField.getImageData(position.x, position.y, 1, 1).data;
  //   const r = imgData[0];
  //   const g = imgData[1];
  //   const b = imgData[2];
  //   const rgb = `rgb(${r}, ${g}, ${b})`;
  //   app.setColorToPixel(rgb);
  // }
  
  // clearCanvas() {
  //   drawField.fillStyle = '#fff';
  //   drawField.fillRect(0, 0, app.pixels * app.scale, app.pixels * app.scale);
  // }
    
  // componentWillReceiveProps() {

