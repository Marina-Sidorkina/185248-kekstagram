'use strict';

(function () {
  var ESC = 27;

  var onEscapeKeydown = function (keyCode) {
    return (keyCode === ESC);
  };

  window.utils = {
    onEscapeKeydown: onEscapeKeydown,
  };
})();
