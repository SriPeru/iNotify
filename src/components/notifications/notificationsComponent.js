(() => {
  'use strict';

  const app = angular.module('app');

  app.component('notifications', {
    // defines a two way binding in and out of the component
    bindings: {
      brand: '<'
    },
    // Pulls in out template
    templateUrl: '/html/notificationsComponent.html',
    controller: function (Messages, filterFilter, nowTime) {
        console.log(Messages.collection);
        this.MsgStore = Messages;
        this.Messages = Messages.collection;
        this.pageLoadTime = (new Date()).toISOString();
        this.nowTime = nowTime;
        console.log(this.Messages);
        
        this.taskCount = (count) => {
            return filterFilter( this.Messages, {"msgType":count}).length;
          }
  }
      })
  .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
})();