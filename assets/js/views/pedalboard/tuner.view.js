define(["backbone", "views/pedalboard/pedal.view", "models/tuner.pedal"], function(Backbone, PedalView, TunerPedal){
    var TunerView = PedalView.extend({

        id: 'tuner',

        initialize: function(options) {
            this.model = this.model || new TunerPedal({});

            _.bindAll(this, 'showPitch');
            this.model.on('change', this.showPitch);
        },

        template: _.template($('#tuner-view-template').html(), {}),

        render: function() {
            $(this.el).html(this.template);
            this.canvas = $(this.el).find('.detune')[0].getContext('2d');
            return this;
        },

        showPitch: function() {
            if (this.model.confidence < 10) {
                $(this.el).find('.pitch').html('');
            } else {
                $(this.el).find('.pitch').html(this.model.notes[this.model.note%12]);                
            }
            this.canvas.clearRect(0,0,300,100);

            this.canvas.fillStyle = (this.model.detune < 0) ? 'red' : 'green';
            this.canvas.fillRect(150, 0, this.model.detune*3, 100);
        }
    });

    return TunerView;
});