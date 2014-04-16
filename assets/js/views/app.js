define(["backbone", "views/pedalboard"], function(Backbone, Pedalboard){
    var App = Backbone.View.extend({
        
        el: 'body',

        initialize: function() {
            this.render();

            this.pedalboard = new Pedalboard({
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