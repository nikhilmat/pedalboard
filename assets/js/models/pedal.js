define(["backbone"], function(Backbone){
    var Pedal = Backbone.Model.extend({

        initialize: function(options) {
            this.input = options.input || PB.microphone.gainNode;
            this.output = options.output || PB.context.createGainNode();

            this.setupPedal();
        },

        connect: function () {
            this.output.connect(PB.out);
        },

        disconnect: function () {
            this.output.disconnect();
        }
    });

    return Pedal;
});