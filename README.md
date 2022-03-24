# web-dom-template-pattern
personal notes φ(..)

write pure javascript.    
use my library: whiteSugar.js (whiteSuggar.filtering.js + whiteSuggar.url.js + ...)   
use axios.

## memo
axios.js
```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```
whiteSuggar.js    
```html
<script src="https://cdn.jsdelivr.net/gh/kurozato/whiteSuggar@1.0.0/dist/whiteSuggar.js"></script>
```
 
 ## main pattern
 classic
 ```js
 ;(function(){
 
   const initilize = function(){
      //initilize method
   };

   initilize();
 }();
 ```

# Unit Test

sinon + chai + macha   
css
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mocha@9.2.2/mocha.css"/>
```
js
```html
<script src="https://cdn.jsdelivr.net/npm/sinon@13.0.1/pkg/sinon.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chai@4.3.6/chai.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mocha@9.2.2/mocha.js"></script>
```
## main pattern
 classic
```js
;(function(){
 const assert = chai.assert;
  describe('nameSpace', function(){
  it('method', function(){
   const expected = 'Xxx';
   const actual = nameSpace.method();
   assert.strictEqual(actual, expected); 
  }
 }
})();
```
I'm used to Visual Stadio UnitTest, so 'assert'.

## runner.html
```html
<!-- test results -->
<div id="mocha"></div>
<!-- use dom test -->
<div id="domTestsAria"></div>
<!-- module load -->

<!-- Mocha setting -->
<script class="mocha-init">
 mocha.setup('bdd');  // BDD
 mocha.checkLeaks();  // fail: grobal object added something
</script>
<!-- target -->

<!--testCode -->

<!-- run tests -->
<script class="mocha-exec">
 mocha.run();
</script>
```
