import React from 'react';
import { fabric } from 'fabric';

const canvas = new fabric.StaticCanvas();
canvas.initialize(document.getElementById('c'), {width: 500, height: 700});

class CanvasField extends React.Component {
  render() {
    return <canvas id='c'></canvas>;
  }
}
export default CanvasField;