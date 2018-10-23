
const MAJOR_CHORDS = {
  'C': [ 'C', 'E', 'G'],
  'C#': [ 'C#', 'F','G#'],
  'D': [ 'D', 'F#', 'A'],
  'D#': [ 'D#', 'G', 'A#'],
  'E': [ 'E', 'G#', 'B'],
  'F': ['F', 'A', 'C'],
  'F#': [ 'F#', 'A#', 'C#'],
  'G': [ 'G', 'B', 'D'],
  'G#': ['G#', 'C', 'D#'],
  'A': [ 'A', 'C#', 'E'],
  'A#': [ 'A#', 'D', 'F'],
  'B': ['B', 'D#', 'F#']
};

const MINOR_CHORDS = {
  'C': ['C', 'D#', 'G'],
  'C#': ['C#', 'E', 'G#'],
  'D': ['D', 'F', 'A'],
  'D#': ['D#', 'F#', 'A#'],
  'E': ['E', 'G', 'B'],
  'F': ['F', 'G#', 'C'],
  'F#': ['F#', 'A', 'C#'],
  'G': [ 'G', 'A#', 'D'],
  'G#': ['G#', 'B', 'D#'],
  'A': ['A', 'C', 'E'],
  'A#': ['A#', 'C#', 'F'],
  'B': ['B', 'D', 'F#']
};

const MAJOR_CYCLE = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];

const MINOR_CYCLE = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F', 'C', 'G', 'D'];

const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const MIDDLE_C = 440 * Math.pow( Math.pow( 2, 1 / 12 ), -9 );

const OCTAVE_OFFSET=4;

const getFrequency = function( name ) {
  var couple = name.split(/(\d+)/),
      distance = CHROMATIC.indexOf(couple[ 0 ]),
      octaveDiff = ( couple[ 1 ] || OCTAVE_OFFSET ) - OCTAVE_OFFSET,
      freq = MIDDLE_C * Math.pow( Math.pow( 2, 1 / 12 ), distance );
  return freq * Math.pow( 2, octaveDiff );
};

export class Drone {

  constructor() {
    this.oscillators = [];
    this.gains = [];
  }

  start() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // create Oscillator node
  }

  _makeOscillators(chord, intensity, octave, output) {
    for(const i in chord) {
      const note = chord[i];
      var oscillator = this.audioCtx.createOscillator();
      var gain = this.audioCtx.createGain();
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(getFrequency(note + octave.toString()), this.audioCtx.currentTime);
      oscillator.connect(gain);
      gain.gain.value = 0.001;
      gain.connect(output);
      oscillator.start();
      this.oscillators.push(oscillator);
      this.gains.push(gain);
      gain.gain.exponentialRampToValueAtTime(0.001 + intensity, this.audioCtx.currentTime + 5);
    }
  }

  update(normX, normY, intensity) {
    while(this.gains.length) {
      const gain = this.gains.shift();
      const oscillator = this.oscillators.shift();
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 5);
      window.setTimeout(function() {
        oscillator.stop();
        oscillator.disconnect();
        gain.disconnect();
      }, 5000);
    }
    //const angle = Math.atan((normY-0.5)/(normX-0.5));
    //const r = Math.sqrt(Math.pow(normX, 2) + Math.pow(normY, 2));
    const scalePosition = normX * 11;
    const chord1 = Math.floor(scalePosition);
    const chord1Mix = scalePosition - Math.floor(scalePosition);
    const chord2 = Math.ceil(scalePosition);
    const chord2Mix = 1 - chord1Mix;
    const minorMix = Math.exp(Math.E * (normY - 1));
    const majorMix = 1 - normY;
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.q =  0.7;
    filter.freq = 7000 + 1000 * intensity;
    const lfo = this.audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.5, this.audioCtx.currentTime);
    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.value = 1200;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.detune);
    filter.connect(this.audioCtx.destination);
    if(majorMix > 0.5) {
      this._makeOscillators(MAJOR_CHORDS[MAJOR_CYCLE[chord1]], chord1Mix * majorMix * intensity, 2,  filter);
    } else {
      this._makeOscillators(MINOR_CHORDS[MINOR_CYCLE[chord1]], chord1Mix * minorMix * intensity, 2, filter);
    }
    this._makeOscillators(MAJOR_CHORDS[MAJOR_CYCLE[chord1]], chord1Mix * majorMix * intensity, 4,  filter);
    this._makeOscillators(MINOR_CHORDS[MINOR_CYCLE[chord1]], chord1Mix * minorMix * intensity, 3,  filter);
    //this._makeOscillators(MAJOR_CHORDS[MAJOR_CYCLE[chord2]], chord2Mix * majorMix * intensity, 5,  filter);
    //this._makeOscillators(MINOR_CHORDS[MINOR_CYCLE[chord2]], chord2Mix * minorMix * intensity, 6, filter);
  }
}
