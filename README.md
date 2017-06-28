# Rules Engine
---
#### Author : Digi-Corp (Ashish & Chandrakant)
##### Created on : 2th Nov 2015
<!-- ##### Update Date : 24th Nov 2015 -->
---
This Rules Engine is used to bind the rules and gets the result based on rules. It have 'RulesEngine()' function which returns 'RE' Object. You require to import 'assertHelper.js' file for use this rules engine library.It is also require user to set **defaultResult** before using getResult() method.
- Create Instance Of RulesEngine
- Useful Functions
  - addRule()
  - removeRule()
  - getResult()
  - print()
  - getRule()
  - getAllRules()
- variable
  - defaultResult

## Create Instance Of RulesEngine
`To use RulesEngine Library  you require to create RulesEngine instance through that you can call it's functions.`

- Example

  ```javascript
  var RulesEngine = new RulesEngine();
  ```
`Here 'RulesEngine' is instance through this you can Call RulesEngine functions.`

## addRule(rule,result)
  `This method is used to add rules into 'RulesEngine' Object.It returns index of current rule into 'RulesEngine' object`

Parameter Name | Descriptions
:------------- | :------------------------------------------------------------------------
rule           | This contains array of JSON objects that defines rule
result         | This contains JSON objects that defines result with respect to given rule

- Attributes for rule and result Object

| Parameter | Attributes     | DataType | Possible Values|
| :------------- | :------------- |:------------- |:------------- |
| rule       | field       | string              |  Any   |
|        | filterType       | string              |  between, in, notin, lt, lteq, gt, gteq, eq, nteq   |
|        | value       | array              |  Any   |
| result | Any       | Any              |  Any   |

- Example

  ```javascript
  RulesEngine.addRule([{field:"growth",filterType:"between",value:[26, 35]},
                        {field:"slope",filterType:"between",value:[26,35]}],
                          {'Color': '#1A9850','Comment': 'Between'});
  ```

  Here,rule is binded for <br/>

  1> growth is Between 26 to 35.  <br/>

  2> slope is Between 26 to 35.

  with result 'Color'='#1A9850' and 'Comment'='Between'

--------------------------------------------------------------------------------

## removeRule(index)
`This method is used to remove the rule from specific index of 'RulesEngine' object.`

Parameter Name | Descriptions
:------------- | :-----------------------------------------------------
index          | This defines index of rules into 'RulesEngine' object

- Example

```javascript
    RulesEngine.removeRule(0);
```
  Here, It will remove first rule from index 0 of 'RulesEngine' object.

--------------------------------------------------------------------------------

## getResult(values)
`This method compare the given value with predefined rules and gives result object based on comaprision`

Parameter Name | Descriptions
:------------- | :--------------------------------------------------------------------------
values         | This defines JSON object which contains values to be compare against rules.

- Example

```javascript
RulesEngine.addRule([{field:"growth",filterType:"between",value:[26, 35]},
                      {field:"slope",filterType:"between",value:[26,35]}],
                        {'Color': '#1A9850','Comment': 'Between'});

retRestult=RulesEngine.getResult({growth:26,slope:29});

```

Here,<br/>

retRestult.Color contains '#1A9850' and retRestult.Comment contains 'Between'

---

## print()
`This method print Entire rules with result and also defaultResult.`

- Example

```javascript
RulesEngine.print()
```
---
### defaultResult
`defaultResult variable defines default result when no rules mathced.You must require to set default result before use getResult method.`

- Example
```javascript
RulesEngine.defaultResult={'Color': '#D73027','Comment': 'Default Message'};
```

---

## getRule(index)
`This method is used to get rule from specific index.`

Parameter Name | Descriptions
:------------- | :-----------------------------------------------------
index          | This defines index of rules into 'RulesEngine' object

- Example

```javascript
RulesEngine.getRule(0)
```
  Here, It will return first rule from index 0 of 'RulesEngine' object.

---

## getAllRules()
`This method is used to get all rules of 'RulesEngine' object.`

- Example

```javascript
RulesEngine.getAllRules()
```
  Here, It will return all rules of 'RulesEngine' object.
