define(["backbone"], function(Backbone){
    var Pedal = Backbone.Model.extend({
        input: PB.microphone.gainNode,
        output: PB.context.createGainNode(),

        connect: function () {
            this.output.connect(PB.out);
        },

        disconnect: function () {
            this.output.disconnect();
        }
    });

    return Pedal;
});