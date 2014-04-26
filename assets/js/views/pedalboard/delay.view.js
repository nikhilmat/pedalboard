define(["backbone", "views/pedalboard/pedal.view", "models/delay.pedal"], function(Backbone, PedalView, DelayPedal){
    var DelayView = PedalView.extend({
        id: 'delay',

        initialize: function(options) {
            this.model = this.model || new DelayPedal({});
        },

        template: _.template($('#delay-view-template').html(), {}),

        events: function() {
            return _.extend({}, PedalView.prototype.events, {
                'keypress input' : 'updateSettings'                
            });
        },

        render: function() {
            $(this.el).html(this.template);
            return this;
        },

        updateSettings: function(e) {
            if (e.which == 13) {
                var options = {};
                options[$(e.target).attr('name')] = parseFloat($(e.target).val());
                this.model.set(options);
            }
        }
    });

    return DelayView;
});