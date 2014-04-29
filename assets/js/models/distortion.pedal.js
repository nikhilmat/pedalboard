define(["underscore", "backbone", "models/pedal"], function(_, Backbone, Pedal){
    var DistortionPedal = Pedal.extend({
        defaults: function() {
            return {
                gain: 50,
                volume: 1,
            };
        },

        setupPedal: function() { 
            this.processor = PB.context.createWaveShaper();

            this.input.connect(this.processor);

            this.getCurve();
            this.processor.connect(this.output);
            window.output = this.output;

            this.on('change', this.updatePedal);
        },

        updatePedal: function() {
            this.output.gain.value = this.get('volume') == 1 ? 1 : this.get('volume')/50.0;
            this.getCurve();
        },

        getCurve: function() {
            var n = 22050
                , curve = new Float32Array(n)
                , deg = Math.PI / 180;

            for (var i = 0; i < n; i++) {
                var x = i * 2 / n - 1;
                curve[i] = (3 + this.get('gain')) * x * 20 * deg / (Math.PI + this.get('gain') * Math.abs(x));
            }

            this.processor.curve = curve;
        }
    });

    return DistortionPedal;
});