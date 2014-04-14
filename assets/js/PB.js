define(function(require) {
  window.PB = {
    microphone : {}
  };

  PB.context = new webkitAudioContext() || new AudioContext() || {};
  PB.out = PB.context.createGainNode();
  PB.analyzer = PB.context.createAnalyser();
  PB.analyzer.smoothingTimeConstant = 0.8;
  PB.analyzer.fftSize = 128;

  PB.out.connect(PB.analyzer);
  PB.analyzer.connect(PB.context.destination);

  PB.microphone.gainNode = PB.context.createGainNode();
  PB.microphone.gainNode.gain.value = 0.5;
  PB.microphone.analyzer = PB.context.createAnalyser();
  PB.microphone.analyzer.smoothingTimeConstant = 0.7;
  PB.microphone.analyzer.fftSize = 128;
  PB.microphone.gainNode.connect(PB.microphone.analyzer);
  PB.microphone.analyzer.connect(PB.out);

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

  // TODO: Make an "on" switch
  PB.setupMicrophone();
});