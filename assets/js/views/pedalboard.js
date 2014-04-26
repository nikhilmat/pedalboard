define(["backbone", "views/pedalboard/delay.view", "views/pedalboard/tuner.view"], function(Backbone, DelayView, TunerView){
    var Pedalboard = Backbone.View.extend({
    
        initialize: function(options) {
            this.render();
            this.createTuner();
            this.createDelay();
        },

        template: _.template($('#pedalboard-template').html(), {}),

        render: function() {
            this.$el.html(this.template);
            return this;
        },

        createTuner: function() {
            this.tunerView = new TunerView();
            this.$el.append(this.tunerView.render().el);
        },

        createDelay: function() {
            this.delayView = new DelayView();
            this.$el.append(this.delayView.render().el);
        }
    });

    return Pedalboard;
});