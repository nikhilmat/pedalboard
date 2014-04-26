define(["backbone"], function(Backbone){
    var Pedal = Backbone.Model.extend({

        initialize: function(options) {
            this.input = options.input || PB.microphone.gainNode;
            this.output = options.output || PB.context.createGainNode();

            this.setupPedal();
        },

        connect: function () {
            this.set('activated', true);
            this.output.connect(PB.out);
        },

        disconnect: function () {
            this.set('activated', false);
            this.output.disconnect();
        }
    });

    return Pedal;
});