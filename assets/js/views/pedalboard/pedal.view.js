define(["backbone"], function(Backbone){
    var PedalView = Backbone.View.extend({
        
        tagName: 'div',
        className: 'pedal',

        events: {
            'click .toggle': 'toggle'
        },

        toggle: function(e) {
            $(e.target).toggleClass('btn-default btn-danger active');
            if ($(e.target).hasClass('active')) {
                this.model.connect();
            } else {
                this.model.disconnect();
            }
        }
    });

    return PedalView;
});