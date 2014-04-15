define(["underscore", "backbone", "models/pedal"], function(_, Backbone, Pedal){
    var DelayPedal = Pedal.extend({

        defaults: function() {
            return {
                delayTime: 0.5,
                feedbackGain: 0.5,
                decayLevel: 0.5   
            };
        },

        setupPedal: function() { 
            this.delay = PB.context.createDelayNode();
            this.feedback = PB.context.createGainNode();
            this.decay = PB.context.createGainNode();

            this.setPedalSettings();

            this.input.connect(this.delay);

            this.delay.connect(this.feedback);
            this.delay.connect(this.decay);
            this.feedback.connect(this.delay);
            this.decay.connect(this.output);

            this.on('change', this.setPedalSettings);
        },

        setPedalSettings: function() {
            debugger;
            this.delay.delayTime.value = this.get('delayTime');
            this.feedback.gain.value = this.get('feedbackGain');
            this.decay.gain.value = this.get('decayLevel');
        }
    });

    return DelayPedal;
});