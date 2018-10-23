import React from 'react';
import { render } from 'react-dom';
import './index.css';
import 'tracking';
import 'tracking/build/data/face-min.js';
import 'tracking/build/data/eye-min.js';
import 'tracking/build/data/mouth-min.js';
import { Drone } from './synth';

import App from './components/App';

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
      syn.update(rect.x, rect.y, rect.width, rect.height);
      context.strokeStyle = '#a64ceb';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    });
  });
};

