// AV on 06-11-2015
! function() {
  var assertHelper = {
    version: "0.0.0"
  };
  assertHelper.assertType = function(obj, type, errorMessage) {
    "use strict";
    errorMessage = errorMessage || 'Assert failed';
    if (assertHelper.toLowerIfDefined(Object.prototype.toString.call(obj)) !== assertHelper.toLowerIfDefined('[object ' + type + ']')) {
      throw Error(errorMessage + ': ' + obj);
    }
  }

  assertHelper.checkType = function(obj, type) {
    "use strict";
    return assertHelper.toLowerIfDefined(Object.prototype.toString.call(obj)) === assertHelper.toLowerIfDefined('[object ' + type + ']');
  }

  assertHelper.checkInteger = function(obj, errorMessage) {
    "use strict";
    errorMessage = errorMessage || 'Assert failed';
    if (obj != undefined && !(Math.abs(obj - parseInt(obj)) < 0.00001)) {
      throw Error(errorMessage + ': ' + obj);
    }
  }

  assertHelper.toLowerIfDefined = function(input) {
    if (input == undefined)
      return input;
    return input.toLowerCase();
  }
  if (typeof define === "function" && define.amd) this.assertHelper = assertHelper, define(assertHelper);
  else if (typeof module === "object" && module.exports) module.exports = assertHelper;
  else this.assertHelper = assertHelper;
}();
