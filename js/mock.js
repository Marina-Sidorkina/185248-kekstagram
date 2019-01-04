'use strict';

(function () {
  var PHOTOS_AMOUNT = 25;
  var PhotoParamRange = {
    LIKES: [15, 200],
    COMMENTS: [1, 5],
    MESSAGES: [1, 2],
    AVATARS: [1, 6]
  };
  var PhotoParamValuesArray = {
    MESSAGES: ['Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
    DESCRIPTIONS: ['Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
      'Will you still love me when I\'m no longer young and beautiful?',
      'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать',
      'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр',
      'Вот это тачка!',
      'Тестим новую камеру!'],
    NAMES: ['Белоснежка', 'Шерхан', 'Манфред', 'Диего', 'Мэнни', 'Эдди']
  };
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var commentTemplate = document.querySelector('.social__comment');
  var photoBlock = document.querySelector('.pictures');
  var bigPhoto = document.querySelector('.big-picture');
  var commentsCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var photosArray = [];

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomArrayElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var createMessage = function () {
    var message = [];
    var length = getRandomArrayElement(PhotoParamRange.MESSAGES);
    for (var i = 0; i < length; i++) {
      message[i] = getRandomArrayElement(PhotoParamValuesArray.MESSAGES);
    }
    return message.join('. ');
  };

  var createCommentsArray = function (amount) {
    var comments = [];
    for (var i = 0; i < amount; i++) {
      comments[i] = {
        avatar: 'img/avatar-' + getRandomNumber(PhotoParamRange.AVATARS[0], PhotoParamRange.AVATARS[1]) + '.svg',
        message: createMessage(),
        name: getRandomArrayElement(PhotoParamValuesArray.NAMES)
      };
    }
    return comments;
  };

  var createPhotosArray = function () {
    var array = [];
    for (var i = 0; i < PHOTOS_AMOUNT; i++) {
      array[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: getRandomNumber(PhotoParamRange.LIKES[0], PhotoParamRange.LIKES[1]),
        comments: createCommentsArray(getRandomNumber(PhotoParamRange.COMMENTS[0], PhotoParamRange.COMMENTS[1])),
        description: getRandomArrayElement(PhotoParamValuesArray.DESCRIPTIONS)
      };
    }
    return array;
  };

  var renderPhotosSet = function () {
    var fragment = document.createDocumentFragment();
    photosArray = createPhotosArray();
    for (var i = 0; i < photosArray.length; i++) {
      var photo = photoTemplate.cloneNode(true);
      photo.querySelector('.picture__img').src = photosArray[i].url;
      photo.querySelector('.picture__likes').textContent = '' + photosArray[i].likes + '';
      photo.querySelector('.picture__comments').textContent = '' + photosArray[i].comments.length + '';
      fragment.appendChild(photo);
    }
    return fragment;
  };

  var renderCommentsSet = function (object) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < object.comments.length; i++) {
      var comment = commentTemplate.cloneNode(true);
      comment.querySelector('.social__picture').src = object.comments[i].avatar;
      comment.querySelector('.social__text').textContent = object.comments[i].message;
      fragment.appendChild(comment);
    }
    return fragment;
  };

  var renderBigPhoto = function () {
    var object = photosArray[0];
    var comments = bigPhoto.querySelector('.social__comments');
    bigPhoto.querySelector('.image-block__item').src = object.url;
    bigPhoto.querySelector('.likes-count').textContent = '' + object.likes + '';
    bigPhoto.querySelector('.comments-count').textContent = '' + object.comments.length + '';
    comments.innerHTML = '';
    comments.appendChild(renderCommentsSet(object));
    bigPhoto.querySelector('.social__caption').textContent = object.description;
  };

  photoBlock.appendChild(renderPhotosSet());
  renderBigPhoto();
  bigPhoto.classList.remove('hidden');
  commentsCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
})();
