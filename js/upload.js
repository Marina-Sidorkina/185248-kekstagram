'use strict';

(function () {
  var photoInput = document.querySelector('#upload-file');
  var photoEditor = document.querySelector('.img-upload__overlay');
  var photoEditorCloseButton = document.querySelector('#upload-cancel');

  var onPhotoUpload = function () {
    photoEditor.classList.remove('hidden');
    window.filters.setDefaultEffect();
    window.filters.setEffect();
    window.range.resetPin();
    window.range.setLineDepth();
    document.addEventListener('keydown', onPhotoEditorEscape);
    photoEditorCloseButton.addEventListener('click', onPhotoEditorClose);
  };

  var onPhotoEditorClose = function () {
    photoEditor.classList.add('hidden');
    window.range.resetPin();
    window.range.setLineDepth();
    photoInput.value = '';
    document.removeEventListener('keydown', onPhotoEditorEscape);
    photoEditorCloseButton.removeEventListener('click', onPhotoEditorClose);
  };

  var onPhotoEditorEscape = function (evt) {
    if (window.utils.onEscapeKeydown(evt.keyCode)) {
      onPhotoEditorClose();
    }
  };

  photoInput.addEventListener('change', onPhotoUpload);
})();
