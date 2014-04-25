define(["backbone", "models/tuner.pedal"], function(Backbone, TunerPedal){
    var TunerView = Backbone.View.extend({
        
        tagName: 'div',
        className: 'pedal',
        id: 'tuner',

        initialize: function(options) {
            this.model = this.model || new TunerPedal({});

            _.bindAll(this, 'showPitch');
            this.model.on('change', this.showPitch);
        },

        template: _.template($('#tuner-view-template').html(), {}),

        render: function() {
            $(this.el).html(this.template);
            return this;
        },

        showPitch: function() {
            if (this.model.confidence < 10) {
                $(this.el).find('.pitch').html('');
            } else {
                $(this.el).find('.pitch').html(this.model.notes[this.model.note%12]);                
            }
            $(this.el).find('.detune').html(this.model.detune)
        }
    });

    return TunerView;
});