'use strict';

module.exports = function(asyncTask, timeoutMillisec, timeoutResponse, supressErrors) {
  if (supressErrors === undefined) {
    supressErrors = true;
  }
  return function(value, callback) {
    var isAsyncMap = (arguments.length !== 1);
    if (isAsyncMap === false) {
      callback = value;
    }

    var called = false;

    if (timeoutMillisec > 0) { // timeout <= 0 disables asyncWithTimeout
      setTimeout(function () {
        if (!called) {
          called = true;
          callback(null, timeoutResponse);
        }
      }, timeoutMillisec);
    }

    var callWithResult = function(err, res) {
      if (! called) {
        called = true;
        if (err) {
          if (supressErrors) {
            callback(null, timeoutResponse);
          } else {
            callback(err);
          }
        } else {
          callback(null, res);
        }
      }
    };

    if (isAsyncMap) {
      asyncTask(value, callWithResult);
    } else {
      asyncTask(callWithResult);
    }
  };
};
