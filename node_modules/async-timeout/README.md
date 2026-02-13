async-timeout
=============

async-timeout is a simple async task wrapper which triggers the callback. 
It supresses errors (by default), thus uses the timeout fallbacks also as an error fallback. 

```javacript
    var timeout = require('async-timeout');
    async.parallel([
      timeout(function noop(){
        // never call back
      }, 1000, 'FALLBACK RESP IN CASE OF TIMEOUT')
    ], function(err, res) {
      console.log(res[0]);
    });
```