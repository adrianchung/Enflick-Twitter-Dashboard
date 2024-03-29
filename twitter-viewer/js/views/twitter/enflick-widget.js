define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'collections/twitter',
  'text!templates/twitter/list.html'
], function($, _, Backbone, Vm, TwitterCollection, TwitterListTemplate){
  TouchWidget = Backbone.View.extend({
    // TODO this is the same as widget.js except for el.
    el: '.twitter-enflick-widget',
    query: '@enflick',
    initialize: function () {
      // isLoading is a useful flag to make sure we don't send off more than
      // one request at a time
      this.isLoading = false;
      this.twitterCollection = new TwitterCollection();
      this.twitterCollection.query = this.query;
    },
    render: function () {
      this.loadResults();
    },
    loadResults: function () {
      var that = this;
      // we are starting a new load of results so set isLoading to true
      this.isLoading = true;
      // fetch is Backbone.js native function for calling and parsing the collection url
      this.twitterCollection.fetch({
        success: function (tweets) {
          // Once the results are returned lets populate our template
          $(that.el).append(_.template(TwitterListTemplate, {tweets: tweets.models, _:_}));
          // Now we have finished loading set isLoading back to false
          that.isLoading = false;
        }
      });
    },
    // This will simply listen for scroll events on the current el
    events: {
      'scroll': 'checkScroll'
    },
    checkScroll: function () {
      var triggerPoint = 100; // 100px from the bottom
      if( !this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight ) {
        this.twitterCollection.page += 1; // Load next page
        this.loadResults();
      }
    }
  });
  return TouchWidget;
});


