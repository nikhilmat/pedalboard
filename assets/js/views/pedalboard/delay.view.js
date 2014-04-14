define(["backbone"], function(Backbone){
    var DelayView = Backbone.View.extend({
        initialize: function() {
            this.model.connect();
            this.render();
        },
        
        template: _.template($('#delay-view-template').html(), {}),

        events: {
            'keypress input' : 'updateDelaySettings'
        },

        render: function() {
            this.$el.append(this.template);
        },

        updateDelaySettings: function(e) {
            if (e.which == 13) {
                var options = {};
                options[$(e.target).attr('name')] = parseFloat($(e.target).val());
                this.model.update(options);
            }
        }
    });

    return DelayView;
});