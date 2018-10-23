import React from 'react';
import { render } from 'react-dom';
import './index.css';
import 'tracking';
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
  var tracker = new window.tracking.ColorTracker();
  window.tracking.track('#video', tracker, { camera: true });
  tracker.setColors(['magenta', 'yellow', 'cyan']);
  tracker.on('track', function(event) {
    event.data.forEach(function(rect) {
      const intensity = (rect.height - MIN_HEIGHT) / MAX_HEIGHT;
      const normX = (rect.x - MIN_X) / MAX_X;
      const normY = (rect.y - MIN_Y) / MAX_Y;
      if(rect.color == 'magenta') {
        syn.update(normX, normY, intensity);
      } else if(rect.color == 'yellow') {
        var red = Math.round(normX * 255);
        var green = Math.round(255 - (normX * 255));
        var blue;
        if (normX < 0.5) {
          blue = Math.round(255 - (normX * 255));
        } else {
          blue = Math.round(255 - ((1 - normX) * 255));
        }
        var alphha = 1 - normY;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alphha})`;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    });
  });
};

