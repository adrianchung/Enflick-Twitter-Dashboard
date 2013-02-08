// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '*actions': 'defaultAction' // All urls will trigger this route
    }
  });

  var initialize = function(options){
		var appView = options.appView;
    var router = new AppRouter(options);

		router.on('route:defaultAction', function (actions) {
			require([
        'views/twitter/textnow-widget',
        'views/twitter/touch-widget',
        'views/twitter/enflick-widget'
      ], function (TextNowWidget, TouchWidget, EnflickWidget) {
        var textNowWidget = new TextNowWidget();
        textNowWidget.render();

        var touchWidget = new TouchWidget();
        touchWidget.render();

        var enflickWidget = new EnflickWidget();
        enflickWidget.render();
      });
		});
    
  };
  return {
    initialize: initialize
  };
});
