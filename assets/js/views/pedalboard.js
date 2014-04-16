define(["backbone", "views/pedalboard/delay.view"], function(Backbone, DelayView){
    var Pedalboard = Backbone.View.extend({
    
        initialize: function(options) {
            this.render();

            this.delayView = new DelayView();
            this.$el.append(this.delayView.render().el);
        },

        template: _.template($('#pedalboard-template').html(), {}),

        render: function() {
            this.$el.html(this.template);
            return this;
        },
    });

    return Pedalboard;
});