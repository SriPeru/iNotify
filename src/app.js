(() => {
  'use strict';
  const app = angular.module('app', ['ngSanitize', 'ngAnimate','ngWebSocket','yaru22.angular-timeago']);

    angular.module('yaru22.angular-timeago').config(function(timeAgoSettings) {
        timeAgoSettings.strings['en_US'] = {
            prefixAgo: null,
            prefixFromNow: null,
            suffixAgo: null,
            suffixFromNow: 'from now',
            seconds: 'Just Now',
            minute: 'minute before',
            minutes: '%d minutes',
            hour: 'an hour before',
            hours: '%d hours before',
            day: 'Yesterday',
            days: '%d days',
            month: 'about a month',
            months: '%d months',
            year: 'about a year',
            years: '%d years',
            numbers: []
          };
    });
  app.controller('HomeCtrl', function () {
    this.loading = "Loading...";
  });
})();