define(["backbone", "views/pedalboard/pedal.view", "models/distortion.pedal", "jquery-ui"], function(Backbone, PedalView, DistortionPedal){
    var DistortionView = PedalView.extend({
        id: 'distortion',

        initialize: function(options) {
            this.model = this.model || new DistortionPedal({});
        },

        template: _.template($('#distortion-view-template').html(), {}),

        render: function() {
            $(this.el).html(this.template);
            this.configureSlider();
            return this;
        },

        configureSlider: function() {
            var self = this;
            $(this.el).find('.slider').slider({
                range: "min",
                value: 50,
                min: 0,
                max: 100,
                orientation: 'vertical',
                slide: function( event, ui ) {
                    var options = {};
                    options[$(ui.handle).parent().data('name')] = ui.value;
                    self.model.set(options);
                }
            });
        }
    });

    return DistortionView;
});