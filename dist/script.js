/******/ (() => { // webpackBootstrap
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!**************************************************************************!*\
  !*** ../../../../ #Noroff/SP2/chrome_ext/haxor_counter/src/js/script.js ***!
  \**************************************************************************/
(function () {
  var platforms = [{
    'name': "keybr.com",
    'handle': 'keybr'
  }];
  var counterKeybrOutput = document.getElementById('counterKeybrOutput');
  var counterKeybrButton = document.getElementById('counterKeybrButton');
  var counterMinusKeybrButton = document.getElementById('counterKeybrButtonMinus');

  // get count from storage
  chrome.storage.sync.get('count', function (result) {
    var counterKeybr = 0;
    if (result.count) {
      counterKeybr = result.count;
    } else {
      chrome.storage.sync.set({
        count: 0
      });
      counterKeybr = 0;
    }
    console.log(counterKeybr);
    counterKeybrOutput.innerHTML = counterKeybr;
  });

  // increment count
  counterKeybrButton.addEventListener('click', function () {
    chrome.storage.sync.get('count', function (result) {
      var counterKeybr = 0;
      if (result.count) {
        counterKeybr = result.count;
      } else {
        chrome.storage.sync.set({
          count: 0
        });
        counterKeybr = 0;
      }
      counterKeybr++;
      chrome.storage.sync.set({
        'count': counterKeybr
      });
      counterKeybrOutput.innerHTML = counterKeybr;
    });
  });

  // decrement count
  counterMinusKeybrButton.addEventListener('click', function () {
    chrome.storage.sync.get('count', function (result) {
      var counterKeybr = 0;
      if (result) {
        counterKeybr = result.count;
      } else {
        chrome.storage.sync.set({
          count: 0
        });
        counterKeybr = 0;
      }
      counterKeybr--;
      chrome.storage.sync.set({
        count: counterKeybr
      });
      counterKeybrOutput.innerHTML = counterKeybr;
    });
  });
})();
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************************************************************!*\
  !*** ../../../../ #Noroff/SP2/chrome_ext/haxor_counter/src/sass/styles.scss ***!
  \******************************************************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;