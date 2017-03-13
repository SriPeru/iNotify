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