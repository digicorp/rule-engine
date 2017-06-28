/**
 * @author Chandrakant Thakkar
 * @version 1.0
 */

// AV on 02-12-2015 for Multiple Rule
! function() {
  if (typeof require === "function") {
    assertHelper = require('./assertHelper');
  }
  "use strict";

  function ruleEngine(options) {
    options = options || {
      type: "hybrid"
    };
    var ruleEngineType = options.type.toLowerCase();
    if (ruleEngineType === "hybrid") {
      return hybridRulesEngine();
    } else if (ruleEngineType === "lookup") {
      if (options.keys === undefined) {
        throw new Error("keys not defined.");
      } else if (assertHelper.checkType(options.keys, "array")) {
        return lookupRuleEngine(options.keys);
      } else {
        throw new Error("Unexpected Type of keys Parameter");
      }
    } else {
      throw new Error("keys should be type of array only");
    }
  };


  function hybridRulesEngine() {
    "use strict";
    var RE = {};
    var inputParam = {};
    var cnt = [];
    //--CBT on 02-Nov-2015: this method is used to add rules with the desired result
    RE.addRule = function(input, output) {
        var index = cnt.length;
        if (input == undefined) {
          throw new Error("Unexpected value of Input Parameter");
        }
        if (output == undefined) {
          throw new Error("Unexpected value of Output Parameter");
        }
        if (assertHelper.checkType(input, "array")) {
          inputParam[index] = {
            rule: input,
            result: output
          };
        } else {
          throw new Error("Unexpected Type of Input Parameter");
        }
        cnt.push(0);
        return index;
      }
      //--CBT on 25-Nov-2015:This method is used to Get  rule at given Index
    RE.getRule = function(index) {
      if (inputParam.hasOwnProperty(index)) {
        return inputParam[index];
      } else {
        throw new Error("Invalid Index");
      }

    }

    //--CBT on 25-Nov-2015:This method is used to Get All rules
    RE.getAllRules = function() {
      return inputParam;
    }

    //--CBT on 02-Nov-2015:This methode is used to remove rule from given index
    RE.removeRule = function(index) {
      if (inputParam.hasOwnProperty(index)) {
        delete inputParam[index];
      } else {
        throw new Error("Invalid Index");
      }
    }

    //--CBT on 02-Nov-2015: This method return's the result based on user Input from Existing Rules
    RE.getResult = function(values) {
      var defaultResult = this.defaultResult;
      if (defaultResult == null) {
        throw new Error("Please Set defaultResult");
      }

      function isEveryConditionTrue(element) {
        var retValue = false;
        switch (element.filterType.toLowerCase()) {
          case "between":
            if (element.value[0] <= values[element["field"]] && element.value[1] >= values[element["field"]]) {
              retValue = true;
            } else {
              retValue = false;
            }
            break;
          case "in":
            retValue = element.value.some(function(e) {
              if (e == values[element["field"]])
                return true;
            });
            break;
          case "notin":
            retValue = element.value.every(function(e) {
              if (e != values[element["field"]])
                return true;
            });
            break;
          case "lt":
            if (values[element["field"]] < element.value[0]) {
              retValue = true;
            } else {
              retValue = false;
            }
            break;
          case "lteq":
            if (values[element["field"]] <= element.value[0]) {
              retValue = true;
            } else {
              retValue = false;
            }
            break;
          case "gt":
            if (values[element["field"]] > element.value[0]) {
              retValue = true;
            } else {
              retValue = false;
            }
            break;
          case "gteq":
            if (values[element["field"]] >= element.value[0]) {
              retValue = true;
            } else {
              retValue = false;
            }
            break;
          case "eq":
            if (values[element["field"]] == element.value[0]) {
              retValue = true;
            } else {
              retValue = false;
            }
            break;
          case "noteq":
            if (values[element["field"]] != element.value[0]) {
              retValue = true;
            } else {
              retValue = false;
            }
            break;
        }

        if (retValue)
          return retValue;

        return false;
      }

      function isSomeConditionTrue(element) {
        return element.every(isEveryConditionTrue);
      }

      function execute() {
        var returnValue = null;
        var result = cnt.some(function(d, i) {
          if (inputParam.hasOwnProperty(i)) {
            if (isSomeConditionTrue(inputParam[i]["rule"])) {
              returnValue = inputParam[i]["result"];
              return true;
            } else
              return false;
          }
        });
        if (result == true) {
          return returnValue;
        } else {
          return defaultResult;
        }

      }

      return execute();

    }
    RE.defaultResult = null;
    //--CBT on 02-Nov-2015:This method is used to print the result
    RE.print = function() {
      console.log([].concat(inputParam).concat([{
        'defaultResult': this.defaultResult
      }]));
    }
    return RE;
  }

  function lookupRuleEngine(inputKeys) {
    "use strict";
    var RE = {};
    RE.defaultCount = 0;
    var localRules = {};
    RE.addRule = function(input, output) {
      if (input == undefined) {
        throw new Error("Unexpected value of Input Parameter");
      } else if (output == undefined) {
        throw new Error("Unexpected value of Output Parameter");
      } else if (assertHelper.checkType(input, "Object")) {
        var localKeys = [];
        inputKeys.forEach(function(localKey) {
          localKeys.push(input[localKey]);
        });
        // TODO
        // AV: 28/01/2016 Add Count
        localRules[localKeys.join()] = {
          output: output,
          count: 0
        };
      } else {
        throw new Error("Unexpected Type of Input Parameter");
      }
    }

    RE.removeRule = function(input) {
      if (input == undefined) {
        throw new Error("Unexpected value of Input Parameter");
      } else if (assertHelper.checkType(input, "Object")) {
        var localKeys = [];
        inputKeys.forEach(function(localKey) {
          localKeys.push(input[localKey]);
        });
        delete localRules[localKeys.join()];
      } else {
        throw new Error("Unexpected Type of Input Parameter");
      }
    }

    RE.getResult = function(input) {
      var defaultResult = this.defaultResult;
      if (defaultResult == null) {
        throw new Error("Please Set defaultResult");
      }
      if (input == undefined) {
        throw new Error("Unexpected value of Input Parameter");
      } else if (assertHelper.checkType(input, "Object")) {
        var localKeys = [];
        inputKeys.forEach(function(localKey) {
          localKeys.push(input[localKey]);
        });
        // TODO
        if (localRules.hasOwnProperty(localKeys.join()) === true) {
          localRules[localKeys.join()].count = (localRules[localKeys.join()].count) + 1;
          return localRules[localKeys.join()].output
        } else {
          this.defaultCount++;
          return defaultResult;
        }
        //return localRules[localKeys.join()].output || defaultResult;
      } else {
        throw new Error("Unexpected Type of Input Parameter");
      }
    }
    RE.getStatistics = function() {
      var localRulesKeysArray = Object.keys(localRules);
      var output = [];
      localRulesKeysArray.forEach(function(d) {
        var keysArray = d.split(",");
        var keys = {}
        keysArray.forEach(function(d1, i) {
          keys["key" + (i + 1)] = d1;
        });
        output.push({
          "Rule": keys,
          "output": localRules[d].output,
          "count": localRules[d].count
        });
      });

      output.push({
        'defaultResult': this.defaultResult,
        'count': this.defaultCount
      });
      return output;
    }
    RE.print = function() {
      //console.log(Object.keys(localRules));
      console.log([].concat(localRules).concat([{
        'defaultResult': this.defaultResult
      }]));
    }
    return RE;
  }

  if (typeof define === "function" && define.amd) this.ruleEngine = ruleEngine, define(ruleEngine);
  else if (typeof module === "object" && module.exports) module.exports = ruleEngine;
  else this.ruleEngine = ruleEngine;
}();
