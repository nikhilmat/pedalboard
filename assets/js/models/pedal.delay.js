define(["underscore", "backbone", "models/pedal"], function(_, Backbone, Pedal){
    var Delay = Pedal.extend({
        initialize: function(options) { 
            this.delay = PB.context.createDelayNode();
            this.feedback = PB.context.createGainNode();
            this.wetLevel = PB.context.createGainNode();

            this.delayTime = options.delayTime || 0.5;
            this.feedbackGain = options.feedbackGain || 0.5;
            this.wetGain = options.wetGain || 0.5;

            this.setAttributes();

            this.input.connect(this.delay);

            this.delay.connect(this.feedback);
            this.delay.connect(this.wetLevel);
            this.feedback.connect(this.delay);
            this.wetLevel.connect(this.output);
        },

        setAttributes: function() {
            this.delay.delayTime.value = this.delayTime;
            this.feedback.gain.value = this.feedbackGain;
            this.wetLevel.gain.value = this.wetGain;
        },

        update: function(options) {
            var self = this;
            _.each(options, function(value, key) {
                self[key] = value;
            });

            this.setAttributes();
        }
    });

    return Delay;
});