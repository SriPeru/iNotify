(() => {
  'use strict';

  const app = angular.module('app');

  app.component('header', {
    bindings: {
      brand: '<'
    },
    templateUrl: '/html/header.html',
    controller: function () {
      this.notifications = "Notifications";
    this.isActive = false;
      this.activeButton = function() {
        this.isActive = !this.isActive;
      }  
    }
  });
})();