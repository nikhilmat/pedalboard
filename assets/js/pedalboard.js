(function (window) {
  'use strict'
  window.PB = {
    microphone : {

    },
    effects : []
  };

  PB.initialize = function() {
    // Setup Web Audio API
    this.context = new webkitAudioContext() || new AudioContext() || {};
    this.out = this.context.createGainNode();
    this.analyzer = this.context.createAnalyser();
    this.analyzer.smoothingTimeConstant = 0.8;
    this.analyzer.fftSize = 128;

    this.out.connect(this.analyzer);
    this.analyzer.connect(this.context.destination);

    this.microphone.gainNode = this.context.createGainNode();
    this.microphone.gainNode.gain.value = 0.5;
    this.microphone.analyzer = this.context.createAnalyser();
    this.microphone.analyzer.smoothingTimeConstant = 0.7;
    this.microphone.analyzer.fftSize = 128;
    this.microphone.gainNode.connect(this.microphone.analyzer);
    this.microphone.analyzer.connect(this.out);
  }

  PB.setupMicrophone = function() {
    var app = this;
    navigator.webkitGetUserMedia({audio: true}, function(stream) {
      app.microphone.source = app.context.createMediaStreamSource(stream);
      app.microphone.source.connect(app.microphone.gainNode);
    }, function (err) {
      console.log(err);
      console.log("Mic is not set up");
    });
  }

})(window);

$(function() {

  PB.initialize();
  PB.setupMicrophone();

  var delay = new SlapbackDelay();
  PB.effects.push(delay);
});