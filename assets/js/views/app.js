define(["backbone", "models/pedal.delay", "views/pedalboard/delay.view"], function(Backbone, Delay, DelayView){
    var App = Backbone.View.extend({
        el: 'body',
        initialize: function() {
            this.render();
            this.delayView = new DelayView({ 
                model: new Delay({}), 
                el: '.pedalboard'
            });
        },

        template: _.template($('#app-template').html(), {}),
        
        render: function() {
            this.$el.html(this.template);
        }
    });

    return App;
});