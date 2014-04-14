require.config({
    paths: {
        "jquery": ["http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
                    "libs/jquery/jquery"],
        "underscore": "libs/underscore/underscore",
        "backbone": "libs/backbone/backbone",
        "bootstrap": "libs/bootstrap.min"
    },
    shim: {
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        "bootstrap": {
            deps: ["jquery"]
        }
    },
    waitSeconds: 10
});

require(['jquery', 'underscore', 'backbone', 'views/app', 'PB'], function(jquery, _, Backbone, App){
    new App;
});