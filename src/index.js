import React from 'react';
import { render } from 'react-dom';
import './index.css';
import 'tracking';
import 'tracking/build/data/face-min.js';
import 'tracking/build/data/eye-min.js';
import 'tracking/build/data/mouth-min.js';
import { Drone } from './synth';

import App from './components/App';

const MIN_X = 0;
const MAX_X = 300;
const MIN_Y = 0;
const MAX_Y =  210;
const MIN_HEIGHT = 20;
const MAX_HEIGHT = 200;
render(
  <App />,
  document.getElementById('app')
);
var syn = new Drone();
window.onload = function() {
  syn.start();
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var tracker = new window.tracking.ObjectTracker('face');
  tracker.setInitialScale(0.25);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  window.tracking.track('#video', tracker, { camera: true });
  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function(rect) {
      const intensity = (rect.height - MIN_HEIGHT) / MAX_HEIGHT;
      const normX = (rect.x - MIN_X) / MAX_X;
      const normY = (rect.y - MIN_Y) / MAX_Y;
      syn.update(normX, normY, intensity);
      context.strokeStyle = '#a64ceb';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    });
  });
};

