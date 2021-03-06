define(["backbone", "views/pedalboard/pedal.view", "models/delay.pedal", "jquery-ui"], function(Backbone, PedalView, DelayPedal){
    var DelayView = PedalView.extend({
        id: 'delay',

        initialize: function(options) {
            this.model = this.model || new DelayPedal({});
            window.delay = this.model;
        },

        template: _.template($('#delay-view-template').html(), {}),

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
                    options[$(ui.handle).parent().data('name')] = ui.value/100.0;
                    self.model.set(options)
                }
            });
        }
    });

    return DelayView;
});