define(["backbone", "models/delay.pedal", "views/pedalboard/delay.view"], function(Backbone, DelayPedal, DelayView){
    var App = Backbone.View.extend({
        
        el: 'body',

        initialize: function() {
            this.render();

            this.delayView = new DelayView();

            this.$el.append(this.delayView.render().el);
        },

        template: _.template($('#app-template').html(), {}),
        
        render: function() {
            this.$el.html(this.template);
        }
    });

    return App;
});