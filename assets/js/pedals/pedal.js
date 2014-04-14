function Pedal() {
  this.input = PB.microphone.gainNode;
  this.output = PB.context.createGainNode();

  this.input.connect(this.output);
  
  this.connect = function () {
    this.output.connect(PB.out);
  };

  this.disconnect = function () {
    this.output.disconnect();
  }
}