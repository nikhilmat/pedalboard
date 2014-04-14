var SlapbackDelay = function(delayTime, feedbackGain, wetGain) {
  var pedal = new Pedal();

  pedal.delay = PB.context.createDelayNode();
  pedal.feedback = PB.context.createGainNode();
  pedal.wetLevel = PB.context.createGainNode();

  pedal.delay.delayTime.value = delayTime || 0.3;
  pedal.feedback.gain.value = feedbackGain || 0.5;
  pedal.wetLevel.gain.value = wetGain || 0.5;


  pedal.input.connect(pedal.delay);

  pedal.delay.connect(pedal.feedback);
  pedal.delay.connect(pedal.wetLevel);
  pedal.feedback.connect(pedal.delay);
  pedal.wetLevel.connect(pedal.output);

  pedal.connect();

  return pedal;
};