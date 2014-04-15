define(["backbone", "models/delay.pedal"], function(Backbone, DelayPedal){
    var DelayView = Backbone.View.extend({
        
        tagName: 'div',
        className: 'pedal',

        initialize: function(options) {
            this.model = this.model || new DelayPedal({});
        },

        template: _.template($('#delay-view-template').html(), {}),

        events: {
            'keypress input' : 'updateSettings'
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