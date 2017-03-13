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
(() => {
  'use strict';

  const app = angular.module('app');
    
app.factory('Messages', function($websocket) {
  let ws = $websocket('ws://echo.websocket.org/');
  let collection=[];

  ws.onMessage(function(event) {
    
    var res;
    try {
        
    const idata = [
            {
                    "msgType": 1,
                    "content": "Steve Jobs has assigned the Book Travel task",
                    "timeStamp": "2017-03-11T05:25:00Z",
                    "action" : "View Task &gt;",
                    "action_href": "#"
                  },
                {
                    "msgType": 2,
                    "content": "Buck Owens has assigned the Mobility Submit task",
                    "timeStamp": "2017-03-11T05:25:00Z",
                    "action" : "View Task &gt;",
                    "action_href": "#"
                  },
                {
                    "msgType": 1,
                    "content": "Hans Zolo has assigned the Mobility. Complete task",
                    "timeStamp": "2017-03-12T05:25:00Z",
                    "action" : "View Task &gt;",
                    "action_href": "#"
                  },
                {
                    "msgType": 1,
                    "content": "Steve Jobs has assigned the Mobility Complete task to you",
                    "timeStamp": "2017-03-12T05:25:00Z",
                    "action" : "View Task &gt;",
                    "action_href": "#"
                  },
                {
                    "msgType": 1,
                    "content": "Tim cook has assigned the Mobility Complete task to you",
                    "timeStamp": "2017-03-12T05:25:00Z",
                    "action" : "View Task &gt;",
                    "action_href": "#"
                  }

            ];
      res = idata;
        
    } catch(e) {
      res = {'msgType': '1', 'message': event.data};
    }
    
      if(res.length > 0){
            res.forEach(function(item, index){
                  collection.push(res[index]);
            });
      }else{
          //console.log(res);
          collection.push(res);
      }
      
      
  });

    //Simulating server push for static demo, will work fine with original source
    let broadcast = function(i) {
        let int = setInterval(function(){
          
              let pushjson = '{'+
                                        '"msgType": 1,'+
                                        '"content": "Srini Perumal Checking the push state - '+ i+'",'+
                                        '"timeStamp": "'+ new Date().toISOString() +'",'+
                                        '"action" : "View Task &gt;",'+
                                        '"action_href": "#"'+
                                      '}';
                    collection.push(JSON.parse(pushjson));
                    console.log('Sent: ' + pushjson);
                    i-- || clearInterval(int);

            
            }, 8000);
        }


        broadcast(6);
    //Simulating server push for static demo, will work fine with original source
    
  ws.onError(function(event) {
    console.log('connection Error', event);
  });

  ws.onClose(function(event) {
    console.log('connection closed', event);
  });

  ws.onOpen(function() {
    console.log('connection open');
    ws.send('Hello There');
    ws.send('Came Again');
    ws.send('and again');
  });
//Didn't close the connection - need to enable
  // setTimeout(function() {
  //   ws.close();
  // }, 500)

  return {
    collection: collection,
    status: function() {
      return ws.readyState;
    },
    send: function(message) {
      if (angular.isString(message)) {
        ws.send(message);
      }
      else if (angular.isObject(message)) {
        ws.send(JSON.stringify(message));
      }
    }

  };
});
})();
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