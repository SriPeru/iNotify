(() => {
  'use strict';

  const app = angular.module('app');

  app.component('footer', {
    bindings: {
      brand: '<'
    },
    templateUrl: '/html/footer.html',
    controller: function () {
      this.footercontent = "&#169; All Rights Reserved. Srini Perumal Inc. 2017";
    }
  });
})();