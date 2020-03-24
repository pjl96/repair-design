$(document).ready(function () {
  var modal = $('.modal');
  var modalThx = $('.modal-thx');
  var modalBtn = $('[data-toggle=modal]');
  var closeBtn = $('.modal__close');

  // Обработка клика по кнопке и вызов модального окна
  modalBtn.on('click', function() {
    modal.toggleClass('modal--visible');
  });

  // Обработка клика по крестику и скрытие модального окна
  closeBtn.on('click', function () {
    modal.removeClass('modal--visible');
    modalThx.removeClass('modal-thx--visible');
  });

  // Обработка нажатия клавиши Esc
  // Если открыто модальное окно - закрывает его
  $(document).keydown(function (e) { 
    if (e.keyCode === 27) {
      modal.removeClass('modal--visible');
    };
    if (e.keyCode === 27) {
      modalThx.removeClass('modal--visible');
    };
  });
  
  // Обработка клика, при открытом модальном окне
  $(modal).mouseup(function (e) { 
    var modalDialog = $('.modal__dialog');
    //Клик был не по модальному окну, и его дочерним элементам
    if (!modalDialog.is(e.target) && modalDialog.has(e.target).length === 0) {
      modal.removeClass('modal--visible'); // Скрываем модальное окно
    }
  });
  $(modalThx).mouseup(function (e) { 
    var modalDialogThx = $('.modal-thx__dialog');
    //Клик был не по модальному окну, и его дочерним элементам
    if (!modalDialogThx.is(e.target) && modalDialogThx.has(e.target).length === 0) {
      modalThx.removeClass('modal-thx--visible'); // Скрываем модальное окно
    }
  });

  //Прокрутка страницы ввехр
  $(function(){
    $(window).scroll(function(){ //Функция прокрутки
      if($(window).scrollTop() > 800) { //Если прокрутили больше 800
        $('.scroll-top__btn').show(); //Показать кнопку
      } else {
        $('.scroll-top__btn').hide();  //Если нет - спрятать
      }
    });
   
    $('.scroll-top__btn').click(function(){ //Клик по кнопке
      $('html, body').animate({scrollTop: 0}, 900); //Пролистать страницу вверх
      return false; //Возврат значения
    });
  });

  //Подключение слайдера
  var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
  
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');

  next.css('left', prev.width() + 30 + bullets.width() + 30)
  bullets.css('left', prev.width() + 30)

  wow = new WOW(
    {
      mobile: false
    }
  ).init();
  
  // Валидация форм
  // Модальное окно
  $('.modal__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      userName: {
        required: true,
        minlength: 2
      },
      userPhone: "required",
      userEmail: {
        required: true,
        email: true
      }
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв"
      },
      userPhone: "Заполните поле",
      userEmail: {
        required: "Заполните поле",
        email: "Введите корректный email"
      }
    }, 
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send-modal.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          modal.removeClass('modal--visible');
          modalThx.addClass('modal-thx--visible');
        }
      });
    }
  });
  
  // Форма секции "Онлайн контроль"
  $('.control__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      userName: {
        required: true,
        minlength: 2
      },
      userPhone: "required"
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв"
      },
      userPhone: "Заполните поле",
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send-control.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          modalThx.addClass('modal-thx--visible');
        }
      });
    }
  });
  
  // Форма футера
  $('.footer__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      userName: {
        required: true,
        minlength: 2
      },
      userPhone: "required",
      userQuestion: {
        required: true,
      }
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв"
      },
      userPhone: "Заполните поле",
      userQuestion: "Задайте вопрос"
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send-footer.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          modalThx.addClass('modal-thx--visible');
        }
      });
    }
  });

  // Маска для телефона
  $('[type=tel]').mask('+7 (000) 000-00-00');

  // Яндекс карта
  // Функция ymaps.ready() будет вызвана, когда
  // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
  ymaps.ready(init);
  function init(){
    // Создание карты.
    var myMap = new ymaps.Map('map', {
      center: [47.244729, 39.723187],
      zoom: 16
    }, {
      searchControlProvider: 'yandex#search'
    }),

    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'Наш офис',
      balloonContent: 'Вход со двора'
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'img/marker.png',
      // Размеры метки.
      iconImageSize: [32, 32],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-5, -38]
    });

  myMap.geoObjects
  .add(myPlacemark);
  }

  // Анимация без библиотек
  var anim = $('.project__title');
  $(window).scroll(function(){
    if ( $(window).scrollTop() <= $(anim).offset().top)  { 
      anim.addClass('my-anim')
     }
    });

});